// Run:
// $(npm bin)/ts-node src/patterns/command.ts

/**
 * Some data that is sent to the receiver via the command.
 */
class StockTransaction {
	stock: string;
	date: string;
	amount: bigint;
	price: bigint;
}

/**
 * Receiver interface
 */
interface IAccount {
	buyStock(tx: StockTransaction);
	sellStock(tx: StockTransaction);
}

/**
 * Concrete receiver
 *
 * Implements the receiver interface
 * Method is executed by the command with the commands payload
 */
class Account implements IAccount {
	buyStock(tx: StockTransaction) {
		console.log('buy', tx);
	}

	sellStock(tx: StockTransaction) {
		console.log('sell', tx);
	}
}

/**
 * Command interface
 */
interface ITransaction {
	trade();
}

/**
 * Concrete command
 *
 * Has knowledge of the receiver
 * Has data payload
 * When command is invoked, receiver's method is called with the data payload
 */
class BuyTransaction implements ITransaction {
	account: IAccount;
	tx: StockTransaction;

	constructor(account: IAccount, tx: StockTransaction) {
		this.account = account;
		this.tx = tx;
	}

	trade() {
		this.account.buyStock(this.tx);
	}
}

/**
 * Concrete command
 *
 * Has knowledge of the receiver
 * Has data payload
 * When command is invoked, receiver's method is called with the data payload
 */
class SellTransaction implements ITransaction {
	account: IAccount;
	tx: StockTransaction;

	constructor(account: IAccount, tx: StockTransaction) {
		this.account = account;
		this.tx = tx;
	}

	trade() {
		this.account.sellStock(this.tx);
	}
}

/**
 * Invoker
 *
 * The invoker accepts and invokes commands. It knows how to executte a command. It may also
 * perform bookkeeping surrounding command execution.
 */
class Agent {
	constructor() {}

	placeOrder(txCommand: ITransaction) {
		txCommand.trade();
	}
}

/**
 * Client
 *
 * The client decides which receiver object to assign to a command.
 * The client decides which command it assigns to the invoker.
 */
function client() {
	const agent = new Agent(); // invoker
	const account = new Account(); // receiver
	const tx = new StockTransaction(); // receiver's payload data
	tx.stock = 'APPL';
	tx.price = 20000n;
	tx.amount = 500n;
	const buyCommand = new BuyTransaction(account, tx); // command

	agent.placeOrder(buyCommand);
}
client();
