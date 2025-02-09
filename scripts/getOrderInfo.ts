import { NetworkProvider } from "@ton/blueprint";
import { Address, toNano } from "@ton/core";
import { OrderContract } from "../wrappers/OrderContract";

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Test address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const orderContract = provider.open(OrderContract.createFromAddress(address));
    const data = await orderContract.getOrderInfo()
    ui.write("owner: " + data.owner.toString());
    ui.write("customer: " + data.customer.toString());
    ui.write("order_id: " + data.order_id);
    ui.write("name: " + data.name);
    ui.write("image: " + data.image);
    ui.write("quantity: " + data.quantity.toString());
    ui.write("price: " + data.price.toString());
    ui.write("status: " + data.status.toString());


   
}
