const frogs = [
  {
    name: "404",
    url: "https://frogs.media/api/images/404.gif",
  },
  {
    name: "frog",
    url: "https://frogs.media/api/images/frog",
  },
  {
    name: "moss",
    url: "https://frogs.media/api/images/moss",
  },
  {
    name: "apple",
    url: "https://frogs.media/api/images/apple",
  },
  {
    name: "spots",
    url: "https://frogs.media/api/images/spots",
  },
  {
    name: "happy",
    url: "https://frogs.media/api/images/happy",
  },
  {
    name: "froggers",
    url: "https://frogs.media/api/images/froggers",
    aliases: ["pog", "poggers"],
  },
  {
    name: "angry",
    url: "https://frogs.media/api/images/angry",
    aliases: ["angy"],
  },
  {
    name: "wholesome",
    url: "https://frogs.media/api/images/wholesome",
  },
  {
    name: "plant",
    url: "https://frogs.media/api/images/plant",
  },
  {
    name: "berry",
    url: "https://frogs.media/api/images/berry",
  },
  {
    name: "smile",
    url: "https://frogs.media/api/images/smile",
  },
  {
    name: "wizard",
    url: "https://frogs.media/api/images/wizard",
  },
  {
    name: "run",
    url: "https://frogs.media/api/images/run",
    aliases: ["speed"],
  },
  {
    name: "king",
    url: "https://frogs.media/api/images/king",
  },
  {
    name: "rainbow",
    url: "https://frogs.media/api/images/rainbow",
    aliases: ["gay"],
  },
  {
    name: "orange",
    url: "https://frogs.media/api/images/orange",
  },
  {
    name: "bruh",
    url: "https://frogs.media/api/images/bruh",
    aliases: ["bru"],
  },
  {
    name: "froccs",
    url: "https://frogs.media/api/images/froccs",
    aliases: ["froc"],
  },
  {
    name: "pink",
    url: "https://frogs.media/api/images/pink",
  },
  {
    name: "red",
    url: "https://frogs.media/api/images/red",
  },
  {
    name: "sad",
    url: "https://frogs.media/api/images/sad",
  },
  {
    name: "smol",
    url: "https://frogs.media/api/images/smol",
  },
  {
    name: "royal",
    url: "https://frogs.media/api/images/royal",
  },
  {
    name: "cowboy",
    url: "https://frogs.media/api/images/cowboy",
  },
  {
    name: "witch",
    url: "https://frogs.media/api/images/witch",
  },
  {
    name: "teacup",
    url: "https://frogs.media/api/images/teacup",
  },
  {
    name: "grass",
    url: "https://frogs.media/api/images/grass",
  },
  {
    name: "shelf",
    url: "https://frogs.media/api/images/shelf",
  },
  {
    name: "tiny",
    url: "https://frogs.media/api/images/tiny",
  },
  {
    name: "squish",
    url: "https://frogs.media/api/images/squish",
    aliases: ["squeesh"],
  },
  {
    name: "car",
    url: "https://frogs.media/api/images/car.gif",
  },
  {
    name: "clean",
    url: "https://frogs.media/api/images/clean.gif",
  },
  {
    name: "peekaboo",
    url: "https://frogs.media/api/images/peekaboo",
  },
  {
    name: "buff",
    url: "https://frogs.media/api/images/buff",
  },
  {
    name: "smart",
    url: "https://frogs.media/api/images/smart",
  },
  {
    name: "stack",
    url: "https://frogs.media/api/images/stack",
  },
  {
    name: "strawberry",
    url: "https://frogs.media/api/images/strawberry",
    aliases: ["strawberru"],
  },
  {
    name: "magic",
    url: "https://frogs.media/api/images/magic",
  },
  {
    name: "fairy",
    url: "https://frogs.media/api/images/fairy",
  },
  {
    name: "blue",
    url: "https://frogs.media/api/images/blue",
    aliases: ["blew", "blu"],
  },
  {
    name: "pirate",
    url: "https://frogs.media/api/images/pirate",
    aliases: ["yar", "yarr"],
  },
  {
    name: "yellow",
    url: "https://frogs.media/api/images/yellow",
  },
  {
    name: "kiss",
    url: "https://frogs.media/api/images/kiss",
    aliases: ["love"],
  },
  {
    name: "hold",
    url: "https://frogs.media/api/images/hold",
    aliases: ["hang"],
  },
  {
    name: "sit",
    url: "https://frogs.media/api/images/sit",
  },
  {
    name: "bath",
    url: "https://frogs.media/api/images/bath",
    aliases: ["bathe"],
  },
  {
    name: "climb",
    url: "https://frogs.media/api/images/climb",
  },
  {
    name: "wow",
    url: "https://frogs.media/api/images/wow",
    aliases: ["woah", "woh"],
  },
  {
    name: "look",
    url: "https://frogs.media/api/images/look",
    aliases: ["peepers"],
  },
  {
    name: "dinner",
    url: "https://frogs.media/api/images/dinner",
    aliases: ["supper"],
  },
  {
    name: "sleep",
    url: "https://frogs.media/api/images/sleep",
    aliases: ["sleeping", "slep", "sleepy"],
  },
  {
    name: "cup",
    url: "https://frogs.media/api/images/cup",
  },
  {
    name: "attack",
    url: "https://frogs.media/api/images/attack.gif",
    aliases: ["attacc"],
  },
  {
    name: "lizard",
    url: "https://frogs.media/api/images/lizard",
  },
  {
    name: "dj",
    url: "https://frogs.media/api/images/dj.gif",
  },
  {
    name: "bread",
    url: "https://frogs.media/api/images/bread",
  },
  {
    name: "hole",
    url: "https://frogs.media/api/images/hole",
  },
  {
    name: "baking",
    url: "https://frogs.media/api/images/baking",
    aliases: ["baker"],
  },
  {
    name: "flower",
    url: "https://frogs.media/api/images/flower",
  },
  {
    name: "skateboard",
    url: "https://frogs.media/api/images/skateboard",
    aliases: ["skate"],
  },
  {
    name: "million",
    url: "https://frogs.media/api/images/million",
  },
  {
    name: "hug",
    url: "https://frogs.media/api/images/hug",
  },
  {
    name: "full",
    url: "https://frogs.media/api/images/full",
  },
  {
    name: "frogator",
    url: "https://frogs.media/api/images/frogator",
    aliases: ["alligator", "gator"],
  },
  {
    name: "gaming",
    url: "https://frogs.media/api/images/gaming",
    aliases: ["gamer", "game"],
  },
  {
    name: "middlefinger",
    url: "https://frogs.media/api/images/middlefinger",
  },
  {
    name: "sadgamer",
    url: "https://frogs.media/api/images/sadgamer",
  },
  {
    name: "stare",
    url: "https://frogs.media/api/images/stare",
    aliases: ["staring"],
  },
  {
    name: "rain",
    url: "https://frogs.media/api/images/rain",
  },
  {
    name: "jamming",
    url: "https://frogs.media/api/images/jamming",
    aliases: ["jammin", "snail"],
  },
  {
    name: "cool",
    url: "https://frogs.media/api/images/cool",
    aliases: ["sunglasses", "😎"],
  },
  {
    name: "yell",
    url: "https://frogs.media/api/images/yell",
    aliases: ["yawn"],
  },
  {
    name: "chill",
    url: "https://frogs.media/api/images/chill",
  },
  {
    name: "a",
    url: "https://frogs.media/api/images/a",
  },
  {
    name: "friday",
    url: "https://frogs.media/api/images/friday",
  },
  {
    name: "singing",
    url: "https://frogs.media/api/images/singing",
    aliases: ["microphone", "mic"],
  },
  {
    name: "motorcycle",
    url: "https://frogs.media/api/images/motorcycle",
    aliases: ["luke"],
  },
  {
    name: "rose",
    url: "https://frogs.media/api/images/rose",
  },
  {
    name: "peace",
    url: "https://frogs.media/api/images/peace",
  },
  {
    name: "french",
    url: "https://frogs.media/api/images/french",
  },
  {
    name: "tower",
    url: "https://frogs.media/api/images/tower",
  },
  {
    name: "foam",
    url: "https://frogs.media/api/images/foam",
  },
  {
    name: "watermelon",
    url: "https://frogs.media/api/images/watermelon",
  },
  {
    name: "pumpkin",
    url: "https://frogs.media/api/images/pumpkin",
  },
]

module.exports = {
  frogs,
}
