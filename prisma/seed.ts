import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpa dados
  await prisma.favorite.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();

  // CATEGORIES
  const categoryNames = [
    "Ficção",
    "Tecnologia",
    "Fantasia",
    "Romance",
    "Biografia",
    "História",
  ];

  await prisma.category.createMany({
    data: categoryNames.map(name => ({ name })),
  });

  const categories = await prisma.category.findMany();
  const getCat = (names: string[]) =>
    categories.filter(c => names.includes(c.name)).map(c => ({ id: c.id }));

  // BOOKS
  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      image:
        "https://covers.openlibrary.org/b/id/15126503-L.jpg",
      description:
        "Clean Code é um dos livros mais influentes para desenvolvedores de software. Ele aborda princípios, padrões e práticas para escrever código limpo, legível e sustentável, com exemplos e estudos de caso que mostram como transformar código confuso em soluções robustas e eficientes. O livro enfatiza valores de responsabilidade, clareza e simplicidade no desenvolvimento profissional de software.",
      categories: ["Tecnologia"],
    },
    {
      title: "1984",
      author: "George Orwell",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/1984_first_edition_cover.jpg",
      description:
        "1984 é um romance distópico que explora uma sociedade totalitária onde o Estado controla a informação, a linguagem e até o pensamento. A obra lida com temas como vigilância, manipulação da verdade e perda de liberdade individual, e continua sendo relevante como crítica social sobre autoritarismo e controle estatal.",
      categories: ["Ficção"],
    },
    {
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      image: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif",
      description:
        "O Senhor dos Anéis é uma épica fantasia que acompanha a jornada de Frodo Bolseiro e seus amigos para destruir o Um Anel e derrotar a escuridão que ameaça a Terra Média. Repleto de personagens complexos, mitologia rica e batalhas lendárias, a obra é considerada uma das maiores da literatura fantástica de todos os tempos.",
      categories: ["Fantasia", "Ficção"],
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      image:
        "https://covers.openlibrary.org/b/id/15091624-L.jpg",
      description:
        "Biografia autorizada de Steve Jobs, cofundador da Apple, baseada em mais de quarenta entrevistas com Jobs e entrevistas com familiares, amigos e colegas. A obra explora sua vida, carreira e impactos tecnológicos, mostrando como sua visão de design e inovação transformou indústrias como computadores, música e telefonia.",
      categories: ["Biografia", "Tecnologia"],
    },
    {
      title: "Dom Casmurro",
      author: "Machado de Assis",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/05/DomCasmurroMachadodeAssis.jpg",
      description:
        "Dom Casmurro é um romance clássico da literatura brasileira que aborda temas como ciúme, memória e dúvida. Narrado por Bentinho, o livro explora sua relação com Capitu e levanta questões sobre confiança e traição, tornando-se uma obra influente no cânone literário nacional.",
      categories: ["Romance", "Ficção"],
    },
    {
      title: "Sapiens: Uma breve história da humanidade",
      author: "Yuval Noah Harari",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sapiens-_A_Brief_History_of_Humankind.png/330px-Sapiens-_A_Brief_History_of_Humankind.png",
      description:
        "Sapiens oferece uma visão profunda da história da humanidade, desde os primeiros Homo sapiens até as complexas sociedades modernas. Harari combina história, antropologia e ciência para mostrar como culturas, agricultura, religião e tecnologia moldaram o mundo em que vivemos hoje.",
      categories: ["História", "Biografia"],
    },
  ];

  for (const book of books) {
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        image: book.image,
        description: book.description,
        categories: {
          connect: getCat(book.categories),
        },
      },
    });
  }

  console.log("✅ Seed concluído!");
}

main()
  .catch(e => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
