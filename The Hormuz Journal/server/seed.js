import "dotenv/config";
import supabase from "./lib/supabase.js";

var articles = [
  {
    title: "Hormuz Island: Iran's Rainbow Jewel in the Persian Gulf",
    category: "Travel",
    content: "Hormuz Island, a small but strikingly colorful island in the Strait of Hormuz, has become one of Iran's most talked-about travel destinations. Known for its vibrant red soil, rainbow-hued mountains, and surreal geological formations, Hormuz offers visitors a landscape unlike anywhere else on Earth. The island's red soil, rich in iron oxide, is used by locals to create traditional spice blends and artisanal cosmetics. Recent tourism initiatives have transformed parts of the island into open-air galleries, with sculptures and installations dotting the coastline. Despite its remote location, Hormuz has attracted artists, photographers, and adventurers from around the world, drawn by its otherworldly beauty and the warm hospitality of its small community.",
    author: "Sara Ahmadi",
    featured: true,
    image_url: "https://picsum.photos/seed/hormuz1/800/400",
  },
  {
    title: "The Resurgence of Persian Calligraphy in Modern Design",
    category: "Art",
    content: "Persian calligraphy, or Khoshnevisi, is experiencing a remarkable renaissance in contemporary design. Once confined to traditional manuscripts and mosque decorations, this ancient art form is now finding expression in fashion, architecture, digital media, and graphic design. Leading Iranian designers are merging centuries-old Nastaliq and Shekasteh scripts with minimalist aesthetics, creating works that bridge the gap between heritage and modernity. International exhibitions in London, New York, and Tokyo have showcased this trend, drawing attention to the aesthetic depth of Persian script. The movement has also sparked a renewed interest among young Iranians in learning calligraphy, with workshops and online courses seeing record enrollment.",
    author: "Mina Rostami",
    featured: true,
    image_url: "https://picsum.photos/seed/calligraphy2/800/400",
  },
  {
    title: "Tech Startups Flourishing in Tehran Despite Sanctions",
    category: "Technology",
    content: "Tehran's startup ecosystem continues to grow at an impressive pace, defying the economic pressures of international sanctions. Fintech, edtech, and logistics platforms have emerged as the leading sectors, with several companies achieving significant scale. Iranian developers have shown remarkable ingenuity in building alternatives to global services, from ride-hailing apps to e-commerce platforms that serve millions. Venture capital activity, while still modest compared to global standards, has increased steadily. Government initiatives to support knowledge-based companies have provided tax incentives and funding opportunities for entrepreneurs. The resilience and creativity of Iran's tech community has drawn attention from international observers, who see it as a testament to the power of necessity-driven innovation.",
    author: "Ali Mohammadi",
    featured: false,
    image_url: "https://picsum.photos/seed/tehrantech3/800/400",
  },
  {
    title: "Nowruz Traditions: How the Persian New Year is Celebrated Worldwide",
    category: "Culture",
    content: "Nowruz, the Persian New Year celebrated on the spring equinox, remains one of the oldest and most widely observed cultural festivities in the world. From Tehran to Los Angeles, from Kabul to Istanbul, over 300 million people mark this occasion with rituals rooted in Zoroastrian traditions stretching back over 3,000 years. The Haft-sin table, adorned with seven symbolic items beginning with the letter 'S', serves as the centerpiece of celebrations. In recent years, UNESCO recognition has helped Nowruz gain visibility among non-Iranian communities. Cities across Europe and North America now host public Nowruz events, featuring traditional music, dance performances, and communal feasts that bring together diverse communities in celebration of renewal and hope.",
    author: "Leila Hosseini",
    featured: false,
    image_url: "https://picsum.photos/seed/nowruz4/800/400",
  },
  {
    title: "The Ancient Silk Road: New Archaeological Discoveries in Central Iran",
    category: "History",
    content: "Recent archaeological excavations in central Iran have uncovered a major Silk Road trading post that reshapes our understanding of East-West commerce in antiquity. The site, located near Isfahan, has yielded artifacts including Chinese ceramics, Roman glassware, and Indian textiles, all dating to the 3rd century CE. Researchers believe this settlement served as a critical waypoint where merchants from different civilizations exchanged not just goods, but ideas, religions, and technologies. The discovery of a large caravanserai with rooms capable of hosting over 200 travelers highlights the scale of ancient trade networks. Digital mapping and ground-penetrating radar have revealed additional structures yet to be excavated, promising years of further discoveries.",
    author: "Dariush Karimi",
    featured: false,
    image_url: "https://picsum.photos/seed/silkroad5/800/400",
  },
  {
    title: "Gulf Cooperation Council Summit: Shifting Alliances in the Middle East",
    category: "Politics",
    content: "The latest GCC summit has revealed significant shifts in regional alliances, with member states increasingly pursuing independent foreign policy agendas. The normalization of relations between several Gulf states and previously adversarial nations has created a complex web of diplomatic relationships that challenge traditional power structures. Economic diversification efforts, particularly Saudi Arabia's Vision 2030 and the UAE's focus on becoming a global tech hub, are reshaping the political landscape. Analysts note that energy transition concerns are driving these nations to seek new partnerships beyond their traditional Western allies, with China and India emerging as increasingly important strategic partners. The summit's communique emphasized economic cooperation and regional stability, though underlying tensions over various issues remain visible.",
    author: "Reza Bahrami",
    featured: false,
    image_url: "https://picsum.photos/seed/gcc6/800/400",
  },
];

async function seed() {
  console.log("Seeding articles...");

  var { data, error } = await supabase
    .from("articles")
    .insert(articles)
    .select();

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log("Seeded " + data.length + " articles successfully.");
  process.exit(0);
}

seed();
