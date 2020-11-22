const express =require('express');
const superTest=require('superTest');

function testServer(route){
  const app=express();
  route(app);
  return superTest(app);
}

module.exports=testServer;