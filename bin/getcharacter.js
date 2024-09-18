import { createCharacter } from '../lib.js'

const getCharacterFromPubkeyAndBlockhash = async (pubkey, blockhash) => {
  try {
    const character = await createCharacter(pubkey, blockhash)
    console.log(JSON.stringify(character))
  } catch (error) {
    console.error('Error getting character:', error.message)
  }
}

// Check if pubkey and blockhash are provided as command-line arguments
if (process.argv.length !== 4) {
  console.log('Usage: node getcharacter.js <pubkey> <blockhash>')
  process.exit(1)
}

const [, , pubkey, blockhash] = process.argv
var character = getCharacterFromPubkeyAndBlockhash(pubkey, blockhash)

//console.log(character)
