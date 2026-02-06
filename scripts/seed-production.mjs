import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
// Schema tables will be referenced directly

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

async function seed() {
  console.log('🌱 Starting database seed...');
  
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Seed Products
    console.log('📦 Seeding products...');
    const products = [
      {
        name: 'Sementes de Milho Híbrido',
        description: 'Sementes de milho de alta qualidade, resistentes à seca',
        price: 2500,
        category: 'Sementes',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        sustainabilityScore: 85,
        stock: 100,
        published: true
      },
      {
        name: 'Fertilizante Orgânico',
        description: 'Fertilizante 100% orgânico para agricultura sustentável',
        price: 1500,
        category: 'Insumos',
        imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
        sustainabilityScore: 95,
        stock: 50,
        published: true
      },
      {
        name: 'Trator Compacto',
        description: 'Trator compacto ideal para pequenas propriedades',
        price: 150000,
        category: 'Equipamentos',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        sustainabilityScore: 70,
        stock: 5,
        published: true
      },
      {
        name: 'Tomates Orgânicos',
        description: 'Tomates frescos cultivados organicamente',
        price: 150,
        category: 'Produtos Frescos',
        imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=800',
        sustainabilityScore: 90,
        stock: 200,
        published: true
      }
    ];

    for (const product of products) {
      await connection.execute(
        'INSERT INTO products (name, description, price, category, imageUrl, sustainabilityScore, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.category, product.imageUrl, product.sustainabilityScore, product.stock]
      );
    }
    console.log(`✅ Created ${products.length} products`);

    // Seed Blog Posts
    console.log('📝 Seeding blog posts...');
    const blogPosts = [
      {
        titlePt: 'Agricultura Sustentável em Moçambique',
        titleEn: 'Sustainable Agriculture in Mozambique',
        excerptPt: 'Descubra as melhores práticas de agricultura sustentável',
        excerptEn: 'Discover the best sustainable agriculture practices',
        contentPt: '# Agricultura Sustentável\n\nA agricultura sustentável é fundamental para o futuro de Moçambique...',
        contentEn: '# Sustainable Agriculture\n\nSustainable agriculture is fundamental for Mozambique\'s future...',
        author: 'FOOD SHIELD Team',
        category: 'Agricultura',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        readTime: 5,
        published: true
      },
      {
        titlePt: 'Como Melhorar a Segurança Alimentar',
        titleEn: 'How to Improve Food Security',
        excerptPt: 'Estratégias práticas para garantir segurança alimentar',
        excerptEn: 'Practical strategies to ensure food security',
        contentPt: '# Segurança Alimentar\n\nA segurança alimentar é um direito básico...',
        contentEn: '# Food Security\n\nFood security is a basic right...',
        author: 'FOOD SHIELD Team',
        category: 'Segurança Alimentar',
        imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
        readTime: 7,
        published: true
      },
      {
        titlePt: 'Técnicas de Irrigação Eficientes',
        titleEn: 'Efficient Irrigation Techniques',
        excerptPt: 'Aprenda técnicas modernas de irrigação para economizar água',
        excerptEn: 'Learn modern irrigation techniques to save water',
        contentPt: '# Irrigação Eficiente\n\nA água é um recurso precioso...',
        contentEn: '# Efficient Irrigation\n\nWater is a precious resource...',
        author: 'FOOD SHIELD Team',
        category: 'Tecnologia',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        readTime: 6,
        published: true
      }
    ];

    for (const post of blogPosts) {
      await connection.execute(
        'INSERT INTO blogPosts (titlePt, titleEn, excerptPt, excerptEn, contentPt, contentEn, author, category, imageUrl, readTime, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [post.titlePt, post.titleEn, post.excerptPt, post.excerptEn, post.contentPt, post.contentEn, post.author, post.category, post.imageUrl, post.readTime, post.published]
      );
    }
    console.log(`✅ Created ${blogPosts.length} blog posts`);

    // Seed Services
    console.log('🛠️ Seeding services...');
    const services = [
      {
        titlePt: 'Consultoria Agrícola',
        titleEn: 'Agricultural Consulting',
        descriptionPt: 'Consultoria especializada em agricultura sustentável',
        descriptionEn: 'Specialized consulting in sustainable agriculture',
        specialist: 'Dr. João Silva',
        price: 5000,
        priceType: 'hourly',
        features: JSON.stringify(['Análise de culturas', 'Planejamento de safra', 'Consultoria em sustentabilidade']),
        available: true
      },
      {
        titlePt: 'Análise de Solo',
        titleEn: 'Soil Analysis',
        descriptionPt: 'Análise completa da qualidade do solo',
        descriptionEn: 'Complete soil quality analysis',
        specialist: 'Dra. Maria Santos',
        price: 2000,
        priceType: 'project',
        features: JSON.stringify(['Análise química', 'Relatório detalhado', 'Recomendações']),
        available: true
      },
      {
        titlePt: 'Treinamento em Agricultura Orgânica',
        titleEn: 'Organic Farming Training',
        descriptionPt: 'Curso prático de agricultura orgânica',
        descriptionEn: 'Practical organic farming course',
        specialist: 'Prof. Carlos Mendes',
        price: 3000,
        priceType: 'daily',
        features: JSON.stringify(['Aulas práticas', 'Material didático', 'Certificado']),
        available: true
      }
    ];

    for (const service of services) {
      await connection.execute(
        'INSERT INTO services (titlePt, titleEn, descriptionPt, descriptionEn, specialist, price, priceType, features, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [service.titlePt, service.titleEn, service.descriptionPt, service.descriptionEn, service.specialist, service.price, service.priceType, service.features, service.available]
      );
    }
    console.log(`✅ Created ${services.length} services`);

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seed();
