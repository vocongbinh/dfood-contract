import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { OrderContract } from '../wrappers/OrderContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('OrderContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('OrderContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let orderContract: SandboxContract<OrderContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        orderContract = blockchain.openContract(OrderContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await orderContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: orderContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and orderContract are ready to use
    });
});
