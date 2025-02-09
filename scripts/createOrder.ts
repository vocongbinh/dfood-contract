import { Address, toNano } from '@ton/core';
import { OrderContract } from '../wrappers/OrderContract';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Test address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const orderContract = provider.open(OrderContract.createFromAddress(address));

    

    await orderContract.sendCreateOrder(provider.sender(), {
        customer: Address.parse("0QDREisYb3hWcNevBoAopiS2UubbDp174WF0_v2XSZd9gcwL"),
        order_id: 'order123',
        name: 'Sample Order',
        image: 'http://example.com/image.png',
        quantity: 1,
        price: toNano('0.05'),
        value: toNano('0.05'),
    });

   
}
