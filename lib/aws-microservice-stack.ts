import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDb } from './dynamo/dynamo';
import { Lambdas } from './lambdas/lambdas';
import { ApiGateway } from './apigateway/apigateway';

export class AwsMicroserviceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const database = new DynamoDb(this, "DynamoDB");

    const microserviceLambda = new Lambdas(this,"Microservice",{
      productTable: database.productTable,
      basketTable: database.basketTable
    })

    const apigateway = new ApiGateway(this,"ApiGateway",{
      productMicroservice: microserviceLambda.productFuntion,
      basketMicroservice: microserviceLambda.basketFuntion
    })
 
  }
}
