import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Vault } from "../target/types/vault";
import { it } from "mocha";

describe("vault", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  

  const program = anchor.workspace.Vault as Program<Vault>;

  const VAULT_SEED = Buffer.from("vault");
  const STATE_SEED = Buffer.from("state");

  const [state,] = anchor.web3.PublicKey.findProgramAddressSync([STATE_SEED,provider.wallet.publicKey.toBuffer()], program.programId) 
  const [vault,] = anchor.web3.PublicKey.findProgramAddressSync([VAULT_SEED,state.toBuffer()],program.programId)

  


  it("Is initialized!", async () => {
    

    
    //const stateAccountInfo = await provider.connection.getAccountInfo(state)
    //const vaultAccountInfo = await provider.connection.getAccountInfo(vault)

   // if (stateAccountInfo != null && vaultAccountInfo != null) {
      console.log("Already initialised")
   // }else{
    
      const tx = await program.methods.initialize().rpc()
    console.log("Your transaction signature", tx);
   // } 
    
    
    
  });

  it("vault deposit", async () => {

    const tx = await program.methods.deposit(new anchor.BN(100)).rpc()

    console.log("Your transaction signature", tx);

  })

  it("vault withdraw", async () => {

    const tx = await program.methods.withdraw(new anchor.BN(10)).rpc()

    console.log("Your transaction signature", tx);
    
  })
});
