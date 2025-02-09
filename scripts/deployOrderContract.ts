import { Address, toNano } from '@ton/core';
import { OrderContract } from '../wrappers/OrderContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const orderContract = provider.open(OrderContract.createFromConfig({
        owner: provider.sender().address!,
        customer: provider.sender().address!,
        order_id: '',
        name: '',
        image: '',
        quantity: 0,
        price: 0n
    }, await compile('OrderContract')));

    await orderContract.sendDeploy(provider.sender(), toNano('2'));

    await provider.waitForDeploy(orderContract.address);

    // run methods on `orderContract`
}
