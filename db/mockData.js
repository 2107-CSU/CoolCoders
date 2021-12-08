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
];

const mockProducts = [
  {
    title: "Greatsword",
    description: "A really great sword.",
    price: 1000,
    quantity: 100,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Power Armor",
    description: "It makes you feel, like, really powerful, dude.",
    price: 1000000,
    quantity: 1,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Tea - Mint",
    description:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    price: 54,
    quantity: 3,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Brocolinni - Gaylan, Chinese",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    price: 76,
    quantity: 1,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Appetizer - Assorted Box",
    description:
      "Sed ante. Vivamus tortor. Duis mattis egestas metus.Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    price: 26,
    quantity: 8,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Syrup - Monin - Passion Fruit",
    description:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    price: 249,
    quantity: 3,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Beef Flat Iron Steak",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    price: 212,
    quantity: 8,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Petite Baguette",
    description:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    price: 54,
    quantity: 5,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Savory",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    price: 245,
    quantity: 2,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Arctic Char - Fresh, Whole",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    price: 160,
    quantity: 5,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Honey - Liquid",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    price: 169,
    quantity: 9,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Syrup - Monin - Granny Smith",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    price: 48,
    quantity: 8,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "The Pop Shoppe - Root Beer",
    description:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    price: 107,
    quantity: 9,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Glass Clear 8 Oz",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    price: 201,
    quantity: 5,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Remy Red Berry Infusion",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    price: 171,
    quantity: 4,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Mustard - Seed",
    description:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    price: 127,
    quantity: 8,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Wine - Port Late Bottled Vintage",
    description: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    price: 209,
    quantity: 7,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Oysters - Smoked",
    description:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    price: 177,
    quantity: 8,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Hickory Smoke, Liquid",
    description:
      "Fusce consequat. Nulla nisl. Nunc nisl.Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    price: 128,
    quantity: 5,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Bread Fig And Almond",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    price: 72,
    quantity: 9,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Beer - Blue Light",
    description:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    price: 10,
    quantity: 2,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Swiss Chard",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    price: 172,
    quantity: 6,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Wine - Cotes Du Rhone Parallele",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    price: 136,
    quantity: 2,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Butter - Unsalted",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    price: 114,
    quantity: 3,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Skewers - Bamboo",
    description:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    price: 17,
    quantity: 6,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Gelatine Leaves - Bulk",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    price: 212,
    quantity: 5,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Veal - Osso Bucco",
    description:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 78,
    quantity: 8,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Soup - Campbells, Creamy",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    price: 69,
    quantity: 4,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Soup Campbells Beef With Veg",
    description:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    price: 246,
    quantity: 2,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Bread - Rolls, Rye",
    description:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    price: 178,
    quantity: 3,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Beer - Labatt Blue",
    description:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    price: 66,
    quantity: 2,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Pail For Lid 1537",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    price: 78,
    quantity: 3,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Creme De Cacao Mcguines",
    description:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    price: 207,
    quantity: 6,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Cheese - Stilton",
    description:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    price: 35,
    quantity: 5,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Tart Shells - Barquettes, Savory",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.Fusce consequat. Nulla nisl. Nunc nisl.",
    price: 154,
    quantity: 6,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Huck Towels White",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    price: 177,
    quantity: 5,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Wasabi Powder",
    description:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    price: 234,
    quantity: 10,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Cauliflower",
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    price: 85,
    quantity: 5,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Tarts Assorted",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    price: 221,
    quantity: 8,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Garbag Bags - Black",
    description:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    price: 98,
    quantity: 3,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Liqueur Banana, Ramazzotti",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    price: 122,
    quantity: 3,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Stock - Beef, White",
    description:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    price: 223,
    quantity: 5,
    categoryId: 1,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Wine - Barolo Fontanafredda",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.Fusce consequat. Nulla nisl. Nunc nisl.Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    price: 106,
    quantity: 1,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Scallops - Live In Shell",
    description:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.In congue. Etiam justo. Etiam pretium iaculis justo.",
    price: 130,
    quantity: 6,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Foil - Round Foil",
    description:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    price: 20,
    quantity: 10,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Lid Tray - 16in Dome",
    description:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    price: 221,
    quantity: 7,
    categoryId: 3,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Leeks - Baby, White",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    price: 63,
    quantity: 7,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Chicken Giblets",
    description:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    price: 3,
    quantity: 6,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Squid - U - 10 Thailand",
    description:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    price: 146,
    quantity: 8,
    categoryId: 5,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Pork - Smoked Back Bacon",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.Fusce consequat. Nulla nisl. Nunc nisl.",
    price: 150,
    quantity: 8,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Chicken - Leg / Back Attach",
    description:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    price: 116,
    quantity: 4,
    categoryId: 2,
    photo: "https://via.placeholder.com/150",
  },
  {
    title: "Chocolate Eclairs",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    price: 136,
    quantity: 6,
    categoryId: 4,
    photo: "https://via.placeholder.com/150",
  },
];

const mockCategories = [
  {
    name: "weapons",
  },
  {
    name: "powerups",
  },
  {
    name: "healing items",
  },
  {
    name: "armor",
  },
  {
    name: "magic",
  },
  {
    name: "potions",
  },
  {
    name: "talismans",
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
