import { Transfer as TransferEvent } from "@bscflip-game/subgraph/src/types/CeaErc20/erc20";
import { Transfer } from "@bscflip-game/subgraph/src/types/schema";
import { addToken } from "@bscflip-game/subgraph/src/mappings/tokens";

export function handleTransfer(event: TransferEvent): void {
  let transactionHash = event.transaction.hash.toHex();
  let transfer = new Transfer(transactionHash);
  transfer.from = event.params.from.toHex();
  transfer.to = event.params.to.toHex();
  transfer.value = event.params.value;
  transfer.save();
  addToken(event.transaction.to.toHex());
}
