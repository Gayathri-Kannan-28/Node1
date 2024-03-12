const mongoose=require("mongoose")
 const express=require ("express")
 const bodyparser=require("body-parser")
 const { Expense } = require('./schema.js')
 const cors=require("cors")

const app=express()
app.use(bodyparser.json())
app.use(cors)

async function connectTodb(){
     try{
        await mongoose.connect("mongodb+srv://gayathrik2022cse:282957dg@cluster0.dc8p9pf.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0")

        const port=process.env.port||8000
        app.listen(port,function(){
        console.log(" DB Connected Succesfully")
       
    })
    
}

catch(e){
  console.log(e)
}
}

connectTodb();

app.post('/addExpense',async function(request,response){
     try{
      await Expense.create({
       "amount":(request.body.amount),
        "category":  (request.body.category),
         "date": (request.body.date)
      })
  response.status(201).json("Entry created")
}
catch(e){
  response.status(500).json(e)
}
}
)
app.listen(8001,function(){
  console.log("Db connected succesfully")
})

app.get('./addExpense',function(){
  console.log()
})


app.get('/get-expense',async function(request,response){
  try{
  const expensedetail=await Expense.find();
  response.status(200).json({
      "total":expensedetail
  })
  }
  catch(error){
      response.status(500).json({
          "status":"not sucessfully recieved",
          "error":error
      });
  }
})

app.delete('/delete-expense/:id',async function(request,response){
  try{
      const expenseEntry=await Expense.findById(request.params.id);
      if(expenseEntry){
          await Expense.findByIdAndDelete(request.params.id)
          response.status(200).json({
              "status":"deleted sucessfully"
          })
      }
      else{
          response.status(401).json({
              "status":"data not found"
          });
      }
  }
  catch(error){
      response.status(404).json(error);
  }
})


app.patch('/patch-expense/:id',async function(request,response){
  try{
      const expenseEntry=await Expense.findById(request.params.id);
      if(expenseEntry){
        await expenseEntry.updateOne({
        "amount":(request.body.amount),
        "category": (request.body.category),
         "date": (request.body.date)
        })
          response.status(200).json({
              "status":"updated sucessfully"
          })
      }
      else{
          response.status(401).json({
              "status":"data not found"
          });
      }
  }
  catch(error){
      response.status(404).json(error);
  }
})