import {  ITable,  } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

interface LambdasProps {
  productTable: ITable;
  basketTable: ITable;
}


export class Lambdas extends Construct {  
  

  public readonly productFuntion: NodejsFunction;
  public readonly basketFuntion: NodejsFunction;

  constructor(scope: Construct , id:string,props: LambdasProps ){
    super(scope, id);

     this.productFuntion = this.createProductFunction(props.productTable);
     this.basketFuntion = this.createBasketFunction(props.basketTable);

  }

  private createProductFunction(productTable: ITable): NodejsFunction{

    const productLambda = new NodejsFunction(this,'productLambdaNodeFunciton',{
      entry: join(__dirname,'/../../src/product/index.js'),
      functionName: "ProductLambdaFunction",
      bundling:{
        externalModules:[
          'aws-sdk'
        ]
      },
      environment:{
        PRIMARY_KEY : 'id',
        TABLE_NAME: productTable.tableName
      }
    })

    productTable.grantReadWriteData(productLambda)


    return productLambda;
  }

  private createBasketFunction(basketTable: ITable): NodejsFunction{

    const basketLambda = new NodejsFunction(this,'basketLambdaNodeFunciton',{
      entry: join(__dirname,'/../../src/basket/index.js'),
      functionName: "basketLambdaFunction",
      bundling:{
        externalModules:[
          'aws-sdk'
        ]
      },
      environment:{
        PRIMARY_KEY : 'id',
        TABLE_NAME: basketTable.tableName
      }
    })

    basketTable.grantReadWriteData(basketLambda)


    return basketLambda;
  }


}