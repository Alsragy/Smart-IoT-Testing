const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const energyData = await hre.ethers.getContractAt("EnergyData", CONTRACT_ADDRESS);

  const deviceId = "sensor-001";
  const hash = "5ef10b04607b84cbc14a9d379a5b18208d2122c9d3e4991fec7a8ef7278753b0";

  const tx = await energyData.storeData(deviceId, hash);
  console.log("⛓️ tx sent:", tx.hash);

  await tx.wait();
  console.log("✅ tx mined");

  const count = await energyData.getCount();
  console.log("📦 count:", count.toString());

  const rec = await energyData.getRecord(0);
  console.log("📄 record[0]:", rec);
}

main().catch((e) => {
  console.error("❌ test failed:", e);
  process.exitCode = 1;
});
