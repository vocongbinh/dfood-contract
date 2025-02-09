import { Address, toNano } from '@ton/core';
import { OrderContract, orderContractConfigToCell } from '../wrappers/OrderContract';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Test address'));

    const orderContract = provider.open(OrderContract.createFromAddress(address));
    await orderContract.sendUpdateOrderStatus(provider.sender(), 1);

   
}
