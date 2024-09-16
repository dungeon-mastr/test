export function getRandomInt(max, seed) {
  const x = Math.sin(seed) * 10000
  return Math.floor((x - Math.floor(x)) * max)
}

export function getModifier(stat) {
  return Math.floor((stat - 10) / 2)
}

export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function createCharacter(pubkey, blockHash) {
  const seed = await sha256(pubkey + blockHash)
  let seedIndex = 0

  const genders = ['Male', 'Female']
  const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome']
  const classes = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Ranger']

  const characterClass =
    classes[
    getRandomInt(
      classes.length,
      parseInt(seed.substr((seedIndex += 8), 8), 16)
    )
    ]

  const stats = {
    strength:
      getRandomInt(13, parseInt(seed.substr((seedIndex += 8), 8), 16)) +
      8,
    dexterity:
      getRandomInt(13, parseInt(seed.substr((seedIndex += 8), 8), 16)) +
      8,
    constitution:
      getRandomInt(13, parseInt(seed.substr((seedIndex += 8), 8), 16)) +
      8,
    intelligence:
      getRandomInt(13, parseInt(seed.substr((seedIndex += 8), 8), 16)) +
      8,
    wisdom:
      getRandomInt(13, parseInt(seed.substr((seedIndex += 8), 8), 16)) +
      8,
    charisma:
      getRandomInt(13, parseInt(seed.substr((seedIndex += 8), 8), 16)) + 8
  }

  const constitutionModifier = getModifier(stats.constitution)

  let hitDice
  switch (characterClass) {
    case 'Fighter':
      hitDice = 10
      break
    case 'Wizard':
      hitDice = 6
      break
    case 'Rogue':
      hitDice = 8
      break
    case 'Cleric':
      hitDice = 8
      break
    case 'Ranger':
      hitDice = 10
      break
    default:
      hitDice = 8
  }

  const hitPoints = hitDice + constitutionModifier

  const character = {
    gender: genders[
      getRandomInt(genders.length, parseInt(seed.substr(seedIndex, 8), 16))
    ],
    race: races[
      getRandomInt(races.length, parseInt(seed.substr(seedIndex, 8), 16))
    ],
    class: characterClass,
    stats,
    hitPoints,
    xp: 0
  }

  return character
}
