export type PizzaItem = {
  name: string;
  price: string;
  desc: string;
  popular: boolean;
  badge: string | null;
  image: string;
};

export const pizzas: PizzaItem[] = [
  {
    name: "Pepperoni",
    price: "$120",
    desc: "Pepperoni premium, queso mozzarella y salsa de tomate casera",
    popular: true,
    badge: "🔥 MÁS PEDIDA",
    image: "/pizza-pepperoni.jpg",
  },
  {
    name: "Hawaiana",
    price: "$130",
    desc: "Jamón, piña caramelizada, queso mozzarella y toque de albahaca",
    popular: false,
    badge: null,
    image: "/pizza-hawaiana.jpg",
  },
  {
    name: "Mexicana",
    price: "$140",
    desc: "Chorizo, jalapeño, cebolla morada, queso y salsa chipotle",
    popular: true,
    badge: "🌶️ PICANTE",
    image: "/pizza-mexicana.jpg",
  },
];
