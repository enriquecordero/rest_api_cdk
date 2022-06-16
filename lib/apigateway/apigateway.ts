import { Construct } from "constructs";
import { NodejsFunction,  } from 'aws-cdk-lib/aws-lambda-nodejs';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

interface ApiGatewayProps {
  productMicroservice: IFunction,
  basketMicroservice: IFunction,
}


export class ApiGateway extends Construct {  
  

  public readonly productFuntion: NodejsFunction;
  public readonly basketFuntion: NodejsFunction;



  constructor(scope: Construct , id:string,props: ApiGatewayProps ){
    super(scope, id);

     // Product api gateway
     this.createProductApi(props.productMicroservice);
     this.createBasketApi(props.basketMicroservice);

  }

  private createProductApi(productMicroservice: IFunction) {
    // Product microservices api gateway
    // root name = product

    // GET /product
    // POST /product

    // Single product with id parameter
    // GET /product/{id}
    // PUT /product/{id}
    // DELETE /product/{id}

    const apigw = new LambdaRestApi(this, 'productApi', {
      restApiName: 'Product Service',
      handler: productMicroservice,
      proxy: false
    });

    const product = apigw.root.addResource('product');
    product.addMethod('GET'); // GET /product
    product.addMethod('POST');  // POST /product
    
    const singleProduct = product.addResource('{id}'); // product/{id}
    singleProduct.addMethod('GET'); // GET /product/{id}
    singleProduct.addMethod('PUT'); // PUT /product/{id}
    singleProduct.addMethod('DELETE'); // DELETE /product/{id}
  }

  private createBasketApi(basketMicroservice: IFunction) {
    // Product microservices api gateway
    // root name = basket

    // GET /basket
    // POST /basket

    // resource name = basket/{username}
    // GET /basket/{username}
    // DELETE /product/{id}
    
    // POST /basket/checkout

    const apigw = new LambdaRestApi(this, 'basketApi', {
      restApiName: 'Basket Service',
      handler: basketMicroservice,
      proxy: false
    });

    const basket = apigw.root.addResource('basket');
    basket.addMethod('GET'); // GET /basket
    basket.addMethod('POST');  // POST /basket
    
    const singleBasket = basket.addResource('{username}'); // product/{id}
    singleBasket.addMethod('GET'); // GET /basket/{username}    
    singleBasket.addMethod('DELETE'); // DELETE /basket/{username}
    
    const basketCheckout = basket.addResource('checkout')
    basketCheckout.addMethod('POST') // POST /basket/checkout
    // expect request paykiad: {username ; swn}

    

  }

}