const mockUsers = [
  {
    email: "alienwear0881@gmail.com",
    name: "Allen Wear",
    password: "ufosRreal!!",
  },
  {
    email: "ellojojo265@outlook.com",
    name: "Elliott Jones",
    password: "eieio34",
  },
  {
    email: "lilgranny25@aol.com",
    name: "Myrtle Castles",
    password: "ilovemygrandson1234",
  },
  {
    email: "lademigod@gmail.com",
    name: "Percy Jackson",
    password: "zeusStan27",
  },
  {
    email: "cowboyhunter73@yahoo.com",
    name: "John Marston",
    password: "rdr2isbetter",
  },
  {
    email: "lhulson0@umn.edu",
    name: "gmingus0",
    password: "eIdApua",
  },
  {
    email: "oayton1@google.com.hk",
    name: "lizat1",
    password: "t4ca7uB",
  },
  {
    email: "caustin2@wix.com",
    name: "jhatwell2",
    password: "dTatL0X",
  },
  {
    email: "bdonhardt3@apache.org",
    name: "tberrycloth3",
    password: "UUf0pxtIm",
  },
  {
    email: "bbreacher4@vkontakte.ru",
    name: "sbateson4",
    password: "hXtKA6vy",
  },
  {
    email: "pstappard5@example.com",
    name: "mvanderweedenburg5",
    password: "cqSd0Ah",
  },
  {
    email: "faizikovich6@go.com",
    name: "tgeldard6",
    password: "RjFZgLPqz0",
  },
  {
    email: "bhonatsch7@techcrunch.com",
    name: "tmapston7",
    password: "aq1oLn",
  },
  {
    email: "pdawbery8@blinklist.com",
    name: "cgive8",
    password: "IFJKemq",
  },
  {
    email: "amcpake9@reuters.com",
    name: "vgudger9",
    password: "baOFOXi5WRSS",
  },
  {
    email: "kcogswella@census.gov",
    name: "civashkova",
    password: "XHpxRJT",
  },
  {
    email: "hbentinckb@psu.edu",
    name: "vdumphyb",
    password: "5egWKZLhP",
  },
  {
    email: "sjurisc@plala.or.jp",
    name: "kbonnettec",
    password: "XjJXa4Q",
  },
  {
    email: "ppetreczd@mozilla.com",
    name: "kwaldrend",
    password: "uC2rDTLe8f7",
  },
  {
    email: "cparmintere@cocolog-nifty.com",
    name: "sbrooksbanke",
    password: "CLIMCjiiZ",
  },
  {
    email: "ehickissonf@nps.gov",
    name: "ecuniffef",
    password: "2qlQWfu0Upnc",
  },
  {
    email: "nmcconachieg@yellowpages.com",
    name: "mstruttmang",
    password: "1xK1tN",
  },
  {
    email: "tfaulconerh@comsenz.com",
    name: "bdangeloh",
    password: "snHIIE5xz",
  },
  {
    email: "bmetsoni@github.com",
    name: "tdamiatai",
    password: "ks5uPF1Oto",
  },
  {
    email: "gdodimeadj@cnet.com",
    name: "msollettj",
    password: "oYCMPGb",
  },
  {
    email: "smariaultk@xrea.com",
    name: "swatlingk",
    password: "PvuIC9Bz5",
  },
  {
    email: "mcorkelll@pen.io",
    name: "rbaylyl",
    password: "u0SKys7Zk",
  },
  {
    email: "ggooddiem@tamu.edu",
    name: "qtrippettm",
    password: "ajRUjt8",
  },
  {
    email: "hvautinn@mlb.com",
    name: "nbadhamn",
    password: "rNF94G",
  },
  {
    email: "wfarloeo@eepurl.com",
    name: "lhutchinsono",
    password: "q0wRregCX",
  },
  {
    email: "txc@yahoo.com",
    name: "txc",
    password: "amapiano",
  },
  {
    email: "test@gmail.com",
    name: "Test User",
    password: "test1234",
  },
  {
    email: "admin@admin.com",
    name: "Admin User",
    password: "adminadmin",
    userStatus: 'admin',
  },
];

const mockProducts = [
  {
    title: "Carolina Panthers Smith 89 Jersey (L)",
    description: "NFL Players Carolina Panthers Smith 89 Jersey Sz Large",
    price: 7.99,
    quantity: 2,
    categoryId: 1,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRefEwlmK67kvkaNb-vjtq8AHLxMdEO_1LY0PS-jqHWt_r3COuG",
  },
  {
    title: "Womens Lauren Ralph Lauren Long Sleeve Shirt",
    description: "Womens Size Large Lauren Ralph Lauren Long Sleeve Button Shirt",
    price: 9.99,
    quantity: 2,
    categoryId: 4,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSflz72IajeYFCmXINvSukFvEmLkfdQwIAPCNcKlt5V7X2BqKBH",
  },
  {
    title: "Coach Black Leather Purse",
    description: "Coach Black Jacquard Leather Trim Zip Top Shoulder Purse",
    price: 10.99,
    quantity: 1,
    categoryId: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVP_Fl6TGxba8_eXcPweHXiUF9iAqi05fqjsn9AM-8UkW9Gs_",
  },
  {
    title: "Rock Revival Skinny Jeans Womens Sz 24",
    description:
      "Rock Revival Scarlett Wide Leg Miss Me Skinny Straight Womens Sz 24",
    price: 17.00,
    quantity: 3,
    categoryId: 5,
    photo: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTR8cIpbRZmpy7lkQT0RAFhIqBjs4yoFRkQyNRa2daowlYoaybw",
  },
  {
    title: "Mens Size Small BKE Slim Fit Casual Shirt",
    description:
      "Mens Size Small BKE Slim Fit Casual Shirt",
    price: 9.99,
    quantity: 1,
    categoryId: 4,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fWJY1J2qwfSwU_mSasqYZRetB-Rxq11rpN-4m4P2QTCfqPE-",
  },
  {
    title: "Women's Ray-Ban Sidestreet Sunglasses w/Case",
    description:
      "Women's Ray-Ban Sidestreet Sunglasses w/Case",
    price: 29.99,
    quantity: 1,
    categoryId: 2,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTcUpOMQpzAeELVLcq3vZ4UFRoBXksycS1EAihKfilfk-IJhyTJ",
  },
  {
    title: "Red Skechers Sneakers Size 7.5",
    description:
      "Ladies Red Skechers Sneakers Size 7.5",
    price: 20.00,
    quantity: 1,
    categoryId: 4,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQiOhDMoKhe9o0gATuPdTIb5_TTzWci4uR7O7FH794opFWGxg9Y",
  },
  {
    title: "J. Pak Collection Men's Leather Jacket Size L",
    description:
      "Vintage J. Pak Collection Men's Leather Jacket Size L",
    price: 16.99,
    quantity: 1,
    categoryId: 3,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgDIOwrQfHbfsR6e0OHewjf3FanTfrwvF1Oxnzcp5q1215MsTE",
  },
  {
    title: "Ladies Nike Dallas Cowboys #29 Jersey (sm)",
    description:
      "Ladies White Nike Dallas Cowboys #29 Jersey Size Small Pre-Owned",
    price: 8.99,
    quantity: 1,
    categoryId: 3,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSr_BtyjDxQfqwsHbL0Bc26SWYbTDHmbSXOjcJlu92Ifc5ma7Bo",
  },
  {
    title: "Lululemon Women's Leggings",
    description:
      "4 Lululemon Women's Leggings Size 4",
    price: 47.00,
    quantity: 2,
    categoryId: 4,
    photo: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTu2McTXzYAAclStOtLAr8RzhteqKFoiNPmAy_p55xmBGu6fRm",
  },
  {
    title: "Men's Fila Shoes SZ 6.5",
    description:
      "Men's Fila Shoes SZ 6.5",
    price: 6.99,
    quantity: 1,
    categoryId: 5,
    photo: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQEoi3RHAji7N1OnExd7Bhn25wOX4LbiOE_S0-I31pedKfkd0vv",
  },
  {
    title: "Women's Adidas Lakers Jersey Size Small",
    description:
      "Women's Adidas Lakers Jersey Size Small",
    price: 5.99,
    quantity: 1,
    categoryId: 1,
    photo: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTj42wccN2sek0VenHQY0qPq2UCXrqFp5VL4CjhORt-qsGkc4CR",
  },
  {
    title: "Mens Brown Coach Tennis Shoes Size 9b",
    description:
      "Mens Brown Coach Tennis Shoes Size 9b",
    price: 12.99,
    quantity: 1,
    categoryId: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwptBWU4PDQyKyRgtF2CduUIha6d-_fX8-SbeRJ0Mjsj2QHiEz",
  },
  {
    title: "Ladies Blue Anne Klein Long Wool Coat Size 14",
    description:
      "Ladies Blue Anne Klein Long Wool Coat Size 14 Pre-Owned",
    price: 24.99,
    quantity: 1,
    categoryId: 5,
    photo: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ726b5rgstW8gIEOZEGJrftyQrBm_yg83BQDxslMLUkzreyUXY",
  },
  {
    title: "Size 3 Glitter Beige Embellish Strapless Dress",
    description:
      "Juniors Size 3 Glitter Beige Embellish Strapless Dress",
    price: 36.99,
    quantity: 1,
    categoryId: 5,
    photo: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0W992xRia7z_A_UHeWuGmb7H-yqpOqhKPZR5_DwQyRi28PKJe",
  },
  {
    title: "POKEMON Poke Balls-Poke-Master-Ultra-Great M",
    description:
      "POKEMON Poke Balls-Poke-Master-Ultra-Great M",
    price: 14.49,
    quantity: 1,
    categoryId: 2,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS_zstbLm6foiREt7gztP4KrEtW4kwIMdNBnDkM5Ew7w6oTqOMb",
  },
  {
    title: "Disney Minnie Mouse Infant Girl's Sleeper 0-3m",
    description:
      "Disney Minnie Mouse Infant Girl's Sleeper 0-3m",
    price: 4.99,
    quantity: 2,
    categoryId: 5,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjF0SPt-6SmTkZ3LRanjngj-SLcYMJpM4BRl_oAJ2lbj27bZ3D",
  },
  {
    title: "Kids Jordan Shoe Size 5.5",
    description: "Kids Jordan Shoe Size 5.5",
    price: 7.99,
    quantity: 1,
    categoryId: 3,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqW_rshJmy6aZ9Q6VubDg2eYWw8pf7AmT9dXqV0LAxol3ZU2nP",
  },
  {
    title: "Gerber Blue Colored Sleeper SZ 12 Months",
    description:
      "Gerber Blue Colored Sleeper SZ 12 Months",
    price: 5.99,
    quantity: 1,
    categoryId: 2,
    photo: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRp1KZDrkX-IAYKLqy6aJtLmJ35CSVlFm4C3IiOMra3qNtJsOB9",
  },
  {
    title: "Michael Kors Women's Shoes Size 6.5",
    description:
      "Michael Kors Women's Shoes Size 6.5",
    price: 11.99,
    quantity: 1,
    categoryId: 4,
    photo: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeeQJGSVtpL55UTovKA8nq_1wMxZc3WfOzmpC097qTnW4ssU67",
  },
  {
    title: "Men's Poetic Justice Tupac Gray Sz. M T-Shirt",
    description:
      "Men's Poetic Justice Tupac Gray Sz. M T-Shirt",
    price: 9.99,
    quantity: 1,
    categoryId: 1,
    photo: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTO-dPW9HM2Bgvgkp3cQW_0PElYYDaHIWTSmnQ5-6kcEXHl5TaS",
  },
];

const mockCategories = [
  {
    name: "shirts",
  },
  {
    name: "athletic wear",
  },
  {
    name: "shoes",
  },
  {
    name: "accessories",
  },
  {
    name: "kids",
  },
  {
    name: "misc",
  },
  {
    name: "home & beauty",
  },
];

const mockOrders = [
  {
    userId: 11,
    totalPrice: 120,
    orderDate: "4/1/2021",
    orderStatus: "cart",
  },
  {
    userId: 7,
    totalPrice: 130,
    orderDate: "12/14/2020",
    orderStatus: "cart",
  },
  {
    userId: 6,
    totalPrice: 156,
    orderDate: "1/13/2021",
    orderStatus: "cart",
  },
  {
    userId: 10,
    totalPrice: 127,
    orderDate: "9/7/2021",
    orderStatus: "delivered",
  },
  {
    userId: 12,
    totalPrice: 129,
    orderDate: "8/18/2021",
    orderStatus: "cart",
  },
  {
    userId: 19,
    totalPrice: 106,
    orderDate: "12/9/2020",
    orderStatus: "in_transit",
  },
  {
    userId: 17,
    totalPrice: 56,
    orderDate: "3/19/2021",
    orderStatus: "delivered",
  },
  {
    userId: 3,
    totalPrice: 23,
    orderDate: "10/22/2021",
    orderStatus: "delivered",
  },
  {
    userId: 16,
    totalPrice: 232,
    orderDate: "10/18/2021",
    orderStatus: "cart",
  },
  {
    userId: 17,
    totalPrice: 113,
    orderDate: "5/27/2021",
    orderStatus: "delivered",
  },
  {
    userId: 2,
    totalPrice: 179,
    orderDate: "5/23/2021",
    orderStatus: "delivered",
  },
  {
    userId: 23,
    totalPrice: 131,
    orderDate: "7/23/2021",
    orderStatus: "delivered",
  },
  {
    userId: 19,
    totalPrice: 28,
    orderDate: "6/15/2021",
    orderStatus: "cart",
  },
  {
    userId: 6,
    totalPrice: 124,
    orderDate: "3/24/2021",
    orderStatus: "processing",
  },
  {
    userId: 19,
    totalPrice: 125,
    orderDate: "10/25/2021",
    orderStatus: "processing",
  },
  {
    userId: 17,
    totalPrice: 239,
    orderDate: "1/13/2021",
    orderStatus: "delivered",
  },
  {
    userId: 13,
    totalPrice: 55,
    orderDate: "7/4/2021",
    orderStatus: "processing",
  },
  {
    userId: 11,
    totalPrice: 32,
    orderDate: "1/11/2021",
    orderStatus: "cart",
  },
  {
    userId: 12,
    totalPrice: 201,
    orderDate: "10/5/2021",
    orderStatus: "delivered",
  },
  {
    userId: 6,
    totalPrice: 231,
    orderDate: "11/4/2021",
    orderStatus: "processing",
  },
  {
    userId: 29,
    totalPrice: 132,
    orderDate: "2/23/2021",
    orderStatus: "in_transit",
  },
  {
    userId: 24,
    totalPrice: 28,
    orderDate: "3/11/2021",
    orderStatus: "delivered",
  },
  {
    userId: 18,
    totalPrice: 145,
    orderDate: "1/14/2021",
    orderStatus: "cart",
  },
  {
    userId: 19,
    totalPrice: 212,
    orderDate: "7/17/2021",
    orderStatus: "in_transit",
  },
  {
    userId: 30,
    totalPrice: 81,
    orderDate: "12/1/2021",
    orderStatus: "processing",
  },
  {
    userId: 31,
    totalPrice: 0,
    orderDate: "12/1/2021",
    orderStatus: "cart",
  },
  {
    userId: 31,
    totalPrice: 0,
    orderDate: "12/13/2021",
    orderStatus: "cart",
  },
];

const mockReviews = [
  {
    productId: 28,
    userId: 24,
    rating: 10,
    text: "Future-proofed well-modulated approach",
    active: false,
  },
  {
    productId: 7,
    userId: 5,
    rating: 6,
    text: "Stand-alone background forecast",
    active: false,
  },
  {
    productId: 16,
    userId: 22,
    rating: 9,
    text: "Devolved cohesive service-desk",
    active: false,
  },
  {
    productId: 32,
    userId: 27,
    rating: 2,
    text: "De-engineered cohesive support",
    active: true,
  },
  {
    productId: 26,
    userId: 19,
    rating: 10,
    text: "User-centric local conglomeration",
    active: true,
  },
  {
    productId: 50,
    userId: 14,
    rating: 7,
    text: "User-friendly maximized hierarchy",
    active: false,
  },
  {
    productId: 13,
    userId: 16,
    rating: 4,
    text: "Stand-alone multi-state process improvement",
    active: true,
  },
  {
    productId: 46,
    userId: 25,
    rating: 7,
    text: "Down-sized non-volatile architecture",
    active: false,
  },
  {
    productId: 30,
    userId: 11,
    rating: 2,
    text: "Advanced needs-based database",
    active: false,
  },
  {
    productId: 27,
    userId: 3,
    rating: 5,
    text: "Synergistic high-level info-mediaries",
    active: false,
  },
  {
    productId: 39,
    userId: 7,
    rating: 8,
    text: "Face to face static paradigm",
    active: true,
  },
  {
    productId: 45,
    userId: 20,
    rating: 4,
    text: "Decentralized fresh-thinking focus group",
    active: true,
  },
  {
    productId: 19,
    userId: 29,
    rating: 4,
    text: "Multi-layered reciprocal functionalities",
    active: true,
  },
  {
    productId: 11,
    userId: 4,
    rating: 10,
    text: "Triple-buffered motivating artificial intelligence",
    active: false,
  },
  {
    productId: 29,
    userId: 24,
    rating: 7,
    text: "Seamless 24/7 monitoring",
    active: false,
  },
  {
    productId: 32,
    userId: 23,
    rating: 3,
    text: "Switchable multimedia strategy",
    active: false,
  },
  {
    productId: 34,
    userId: 1,
    rating: 8,
    text: "Future-proofed neutral Graphical User Interface",
    active: false,
  },
  {
    productId: 51,
    userId: 23,
    rating: 3,
    text: "Polarised cohesive monitoring",
    active: false,
  },
  {
    productId: 9,
    userId: 17,
    rating: 7,
    text: "Synergized uniform frame",
    active: false,
  },
  {
    productId: 1,
    userId: 24,
    rating: 10,
    text: "Versatile disintermediate productivity",
    active: true,
  },
  {
    productId: 5,
    userId: 26,
    rating: 6,
    text: "Devolved hybrid product",
    active: false,
  },
  {
    productId: 48,
    userId: 7,
    rating: 1,
    text: "Down-sized 24/7 strategy",
    active: false,
  },
  {
    productId: 2,
    userId: 2,
    rating: 1,
    text: "Extended web-enabled parallelism",
    active: false,
  },
  {
    productId: 51,
    userId: 22,
    rating: 7,
    text: "Streamlined client-driven product",
    active: false,
  },
  {
    productId: 47,
    userId: 23,
    rating: 9,
    text: "Phased responsive archive",
    active: true,
  },
];

module.exports = {
  mockUsers,
  mockProducts,
  mockCategories,
  mockOrders,
  mockReviews,
};
