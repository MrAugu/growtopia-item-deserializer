const fs = require("fs");
const zlib = require("zlib");
var bin;
const secret = null ? null : null;
var readingPosition = 0;

console.log("Starting item deserialization.");
console.log("Reading 'items.dat'...");
try {
    bin = fs.readFileSync("item.dat");
    console.log("File 'items.dat' found, file readed sucessfully.");
} catch (e) {
    console.log("File 'items.dat' could not be found. Aborted.");
}

zlib.unzip(bin, (err, inflatedBinary) => {
  if (err) throw err;
  bin = inflatedBinary;
  if (bin !== inflatedBinary) throw new Error("Reading binary is not same with decompressed binary.");
  const SerializationTime = Date.now();
const itemDatVersion = bin.readIntLE(readingPosition, 2);
readingPosition += 2;
console.log(`Items.dat Version: ` + itemDatVersion);
const amountOfItems = bin.readIntLE(readingPosition, 4);
readingPosition += 4;
console.log(`Amount of items found: ` + amountOfItems);
const json = {};

json.version = itemDatVersion;
json.totalItems = amountOfItems;
json.items = [];

for (var k = 0; k < amountOfItems; k++) {
    const id = bin.readIntLE(readingPosition, 4); // First item id
    readingPosition += 4;
    const editableType = bin[readingPosition]; // Firt item editable type
    readingPosition += 1;
    const itemCategory = bin[readingPosition]; // Item category (!!)
    readingPosition += 1;
    const actionType = bin[readingPosition]; // Actiontype
    readingPosition += 1;
    const hitSoundType = bin[readingPosition]; // Hit sound type
    readingPosition += 1;
    const nameLength = bin.readInt16LE(readingPosition); // Little-Endian 16 Bit Int
    readingPosition += 2;

    var name = "";

    for (var i = 0; i < nameLength; i++) {
        name += String.fromCharCode(bin[readingPosition] ^ (secret[(id + i) % secret.length]));
        readingPosition += 1;
    }

    var texture = "";
    const textureLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    for (var i = 0; i < textureLength; i++) {
        texture += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const textureHash = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const itemKind = bin[readingPosition];
    readingPosition += 1;

    const itemVal = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const textureX = bin[readingPosition];
    readingPosition += 1;

    const textureY = bin[readingPosition];
    readingPosition += 1;

    const spreadType = bin[readingPosition];
    readingPosition += 1;

    const isStripeyWallpaper = bin[readingPosition];
    readingPosition += 1;

    const collisionType = bin[readingPosition];
    readingPosition += 1;

    const breakHits = bin[readingPosition];
    readingPosition += 1;

    const dropChance = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const clothingType = bin[readingPosition];
    readingPosition += 1;

    const rarity = bin.readIntLE(readingPosition, 2);
    readingPosition += 2;

    const maxAmount = bin[readingPosition];
    readingPosition += 1;

    const extraFileLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var extraFile = "";
    for (var i = 0; i < extraFileLength; i++) {
        extraFile += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const extraFileHash = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const audioVolume = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const petNameLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var petName = "";
    for (var i = 0; i < petNameLength; i++) {
        petName += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const petPrefixLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var petPrefix = "";
    for (var i = 0; i < petPrefixLength; i++) {
        petPrefix += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const petSuffixLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var petSuffix = "";
    for (var i = 0; i < petSuffixLength; i++) {
        petSuffix += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const petAbilityLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var petAbility = "";
    for (var i = 0; i < petAbilityLength; i++) {
        petAbility += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const seedBase = bin[readingPosition];
    readingPosition += 1;

    const seedOverlay = bin[readingPosition];
    readingPosition += 1;

    const treeBase = bin[readingPosition];
    readingPosition += 1;

    const treeLeaves = bin[readingPosition];
    readingPosition += 1;


    const seedColor = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const seedOverlayColor = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    readingPosition += 4; /* Ingredients Ignored */

    const growTime = bin.readIntLE(readingPosition, 4);
    readingPosition += 4;

    const itemValueTwo = bin.readIntLE(readingPosition, 2);
    readingPosition += 2;

    const isRayman = bin.readIntLE(readingPosition, 2);
    readingPosition += 2;

    const extraOptionsLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var extraOptions = "";
    for (var i = 0; i < extraOptionsLength; i++) {
        extraOptions += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    var textureTwo = "";
    const textureTwoLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    for (var i = 0; i < textureTwoLength; i++) {
        textureTwo += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    const extraOptionsTwoLength = bin.readInt16LE(readingPosition);
    readingPosition += 2;

    var extraOptionsTwo = "";
    for (var i = 0; i < extraOptionsTwoLength; i++) {
        extraOptionsTwo += String.fromCharCode(bin[readingPosition]);
        readingPosition += 1;
    }

    readingPosition += 80;;

    var punchOptions = "";

    if (itemDatVersion >= 11) {
        const punchOptionsLength = bin.readInt16LE(readingPosition);
        readingPosition += 2;

        for (var y = 0; y < punchOptionsLength; y++) {
            punchOptions += String.fromCharCode(bin[readingPosition]);
            readingPosition += 1;
        }
    }

    const ItemObject = {
        itemID: id,
        hitSoundType: hitSoundType,
        name: name,
        texture: texture,
        textureHash: textureHash,
        val1: itemVal,
        itemKind: itemKind,
        editableType: editableType,
        itemCategory: itemCategory,
        actionType: actionType,
        textureX: textureX,
        textureY: textureY,
        spreadType: spreadType,
        isStripeyWallpaper: isStripeyWallpaper,
        collisionType: collisionType,
        breakHits: breakHits,
        dropChance: dropChance,
        clothingType: clothingType,
        rarity: rarity,
        maxAmount: maxAmount,
        extraFile: extraFile,
        extraFileHash: extraFileHash,
        audioVolume: audioVolume,
        petName: petName,
        petPrefix: petPrefix,
        petSuffix: petSuffix,
        petAbility: petAbility,
        seedColor: seedColor,
        seedBase: seedBase,
        seedOverlay: seedOverlay,
        treeBase: treeBase,
        treeLeaves: treeLeaves,
        seedOverlayColor: seedOverlayColor,
        growTime: growTime,
        val2: itemValueTwo,
        isRayman: isRayman,
        extraOptions: extraOptions,
        texture2: textureTwo,
        extraOptions2: extraOptionsTwo,
        punchOptions: punchOptions
    };
    json.items.push(ItemObject);
}
const SerializationTimeEnd = Date.now();
const diff = SerializationTimeEnd - SerializationTime;

console.log(`Serialization successfull ${diff / 1000} seconds taken.`);
console.log("Writing file...");
const FileTime = Date.now();
fs.writeFileSync("data.json", JSON.stringify(json, null, 4));
const FileTimeEnd = Date.now();
console.log(`File written in ${FileTimeEnd - FileTime}ms.`);
});
