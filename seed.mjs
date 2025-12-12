import { drizzle } from 'drizzle-orm/mysql2';
import { products, blogPosts, services } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

const seedProducts = [
  {
    name: "Sementes Orgânicas de Milho",
    description: "Sementes certificadas, livres de OGM, ideais para agricultura sustentável",
    price: 250,
    category: "Sementes",
    imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800",
    sustainabilityScore: 95,
    stock: 50
  },
  {
    name: "Fertilizante Orgânico",
    description: "Composto natural rico em nutrientes para solo saudável",
    price: 180,
    category: "Insumos",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800",
    sustainabilityScore: 90,
    stock: 100
  },
  {
    name: "Sistema de Irrigação por Gotejamento",
    description: "Economize até 70% de água com tecnologia eficiente",
    price: 1500,
    category: "Equipamentos",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800",
    sustainabilityScore: 88,
    stock: 20
  },
  {
    name: "Kit de Compostagem",
    description: "Transforme resíduos orgânicos em adubo de qualidade",
    price: 450,
    category: "Equipamentos",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    sustainabilityScore: 92,
    stock: 35
  },
  {
    name: "Tomate Orgânico Local",
    description: "Produção local certificada, colhido na hora certa",
    price: 80,
    category: "Produtos Frescos",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800",
    sustainabilityScore: 85,
    stock: 200
  },
  {
    name: "Mel Silvestre",
    description: "Mel puro de abelhas nativas, sem processamento",
    price: 350,
    category: "Produtos Frescos",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784720?q=80&w=800",
    sustainabilityScore: 93,
    stock: 45
  }
];

const seedBlogPosts = [
  {
    title: "Agricultura Sustentável: Práticas para o Futuro",
    content: "A agricultura sustentável é fundamental para garantir a segurança alimentar...",
    excerpt: "Descubra as melhores práticas de agricultura sustentável",
    category: "Agricultura",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
    published: true,
    authorId: 1
  },
  {
    title: "Compostagem: Transforme Resíduos em Nutrientes",
    content: "A compostagem é uma técnica simples e eficaz para reduzir resíduos...",
    excerpt: "Aprenda a fazer compostagem em casa",
    category: "Sustentabilidade",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    published: true,
    authorId: 1
  },
  {
    title: "Irrigação Eficiente: Economize Água",
    content: "Sistemas de irrigação eficientes podem reduzir o consumo de água em até 70%...",
    excerpt: "Técnicas modernas de irrigação para agricultura",
    category: "Tecnologia",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800",
    published: true,
    authorId: 1
  }
];

const seedServices = [
  {
    title: "Consultoria em Agricultura Sustentável",
    description: "Orientação especializada para implementar práticas sustentáveis em sua propriedade",
    price: 500,
    duration: "2 horas",
    category: "Consultoria",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
    available: true
  },
  {
    title: "Análise de Solo",
    description: "Análise completa do solo para identificar nutrientes e necessidades",
    price: 300,
    duration: "1 hora",
    category: "Análise",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800",
    available: true
  },
  {
    title: "Treinamento em Compostagem",
    description: "Workshop prático sobre técnicas de compostagem",
    price: 200,
    duration: "3 horas",
    category: "Treinamento",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    available: true
  }
];

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Seed products
    console.log('📦 Seeding products...');
    for (const product of seedProducts) {
      await db.insert(products).values(product);
    }
    console.log('✅ Products seeded!');

    // Seed blog posts
    console.log('📝 Seeding blog posts...');
    for (const post of seedBlogPosts) {
      await db.insert(blogPosts).values(post);
    }
    console.log('✅ Blog posts seeded!');

    // Seed services
    console.log('🛠️ Seeding services...');
    for (const service of seedServices) {
      await db.insert(services).values(service);
    }
    console.log('✅ Services seeded!');

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
