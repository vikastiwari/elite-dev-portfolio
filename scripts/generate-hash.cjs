const { buildPoseidon } = require('circomlibjs');

async function main() {
    const poseidon = await buildPoseidon();
    const hash = poseidon([777777]);
    console.log(poseidon.F.toString(hash));
}
main();
