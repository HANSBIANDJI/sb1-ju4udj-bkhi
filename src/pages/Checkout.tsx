import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PhoneInput } from '@/components/PhoneInput';
import { MapPin, CreditCard, Truck, User, Mail } from 'lucide-react';

const ZONES = {
  'abidjan-nord': {
    name: 'Abidjan Nord',
    areas: ['Plateau', 'Cocody', 'Adjame', 'Abobo', 'Yopougon'],
    delivery: {
      rapid: { price: 2000, label: 'Livraison rapide (24h)' },
      normal: { price: 1000, label: 'Livraison normale (48-72h)' }
    }
  },
  'abidjan-sud': {
    name: 'Abidjan Sud',
    areas: ['Marcory', 'Koumassi', 'Port Bouet'],
    delivery: {
      rapid: { price: 2500, label: 'Livraison rapide (24h)' },
      normal: { price: 1500, label: 'Livraison normale (48-72h)' }
    }
  },
  'hors-zone': {
    name: 'Hors zone',
    areas: ['Anyama', 'Bingerville', 'Songon', 'Bassam'],
    delivery: {
      rapid: { price: 3000, label: 'Livraison rapide (48h)' }
    }
  }
};

export default function Checkout() {
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const cartTotal = 75000; // Example cart total

  const selectedZone = ZONES[zone as keyof typeof ZONES];
  const deliveryPrice = selectedZone?.delivery[deliveryType as keyof typeof selectedZone.delivery]?.price || 0;
  const total = cartTotal + deliveryPrice;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Finaliser la commande</h1>
      
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prénom</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <Label>Nom</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adresse de livraison
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label>Zone de livraison</Label>
                <Select value={zone} onValueChange={(value) => {
                  setZone(value);
                  setArea('');
                  setDeliveryType('');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ZONES).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {zone && (
                <div>
                  <Label>Commune</Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre commune" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedZone.areas.map((areaName) => (
                        <SelectItem key={areaName} value={areaName}>{areaName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {zone && (
                <div>
                  <Label>Type de livraison</Label>
                  <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="mt-2">
                    {Object.entries(selectedZone.delivery).map(([key, { label, price }]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="flex-1">
                          {label}
                          <span className="ml-2 text-purple-600 font-semibold">{price} FCFA</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div>
                <Label>Adresse complète</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rue, quartier, points de repère..."
                />
              </div>

              <PhoneInput
                label="Téléphone"
                value={phone}
                onChange={setPhone}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Mode de paiement
            </h2>
            <RadioGroup defaultValue="cash" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Paiement à la livraison</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile">Mobile Money</Label>
              </div>
            </RadioGroup>
          </Card>
        </div>

        <Card className="p-6 h-fit sticky top-8">
          <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{cartTotal.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-purple-600">
              <span>Livraison</span>
              <span>{deliveryPrice.toLocaleString()} FCFA</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total.toLocaleString()} FCFA</span>
            </div>
            <Button 
              className="w-full"
              size="lg"
              disabled={!firstName || !lastName || !email || !zone || !area || !deliveryType || !address || !phone}
            >
              Procéder au paiement
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}