import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";


export class DynamoDb extends Construct {
  
  
  public readonly productTable: ITable;
  public readonly basketTable: ITable;

  constructor(scope: Construct , id:string ){
    super(scope, id);

    this.productTable = this.createProductTable();
    this.basketTable= this.createBasketTable();
  }

  private createProductTable(){

    //product : PK:id --name , -- description --imageFile --price --category
    const productTable = new Table(this,'productTable',{
      partitionKey:{name:'id',type: AttributeType.STRING},
      tableName: "ProductTable",
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    })
    return productTable;
  }

  private createBasketTable(){

    //basket : PK:username --items (SET-MAP obj) 
    // item 1 --quantity --color --price --productId --productName
    // item 2 --quantity --color --price --productId --productName

    const basketTable = new Table(this,'basketTable',{
      partitionKey:{name:'username',type: AttributeType.STRING},
      tableName: "BasketTable",
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    })
    return basketTable;
  }


}