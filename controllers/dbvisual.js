const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
const modelodbaudiovisual = require("../models/dbvisual");
const getfighters = async (req = request, res = response) => {
 let conn;

 try {
    conn = await pool.getConnection()

    const users = await conn.query(modelodbaudiovisual.queryGetfighters, (error) => {throw new Error(error)})

    if (!users) {
        res.status(404).json({msg: "no se encontraron registros"})
        return
    }
    res.json({users})
 } catch (error) {
    console.log(error)
    res.status(500).json({error})
 } finally{
    if (conn) {
        conn.end()
    }
 }
}
const getfightersByID = async (req = request, res = response) => {
   const {id} = req.params
   let conn;
  
   try {
      conn = await pool.getConnection()
  
      const [user] = await conn.query(modelodbaudiovisual.queryGetfightersById,[id], (error) => {throw new Error(error)})
  
      if (!user) {
          res.status(404).json({msg: `no se encontro registro con el ID ${id}`})
          return
      }
      res.json({user})
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
}
const deletefightersByID = async (req = request, res = response) => {
   const {id} = req.query
   let conn;
   try {
      conn = await pool.getConnection()
      const {affectedRows} = await conn.query( modelodbaudiovisual.queryDeletedfighter,[id], (error) => {throw new Error(error)})
  
      if (affectedRows=== 0) {
          res.status(404).json({msg: `No se pudo eliminar el cliente con el registro con el ID ${id}`})
          return
      }
      res.json({msg: `El cliente con ID ${id} se elimino correctamente`})
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
}
const addfighter = async (req = request, res = response) => {
   const {
      cliente,
      sala,
      personal
   } = req.body
   if(      
   !cliente||
   !sala||
   !personal
   ){
      res.status(400).json({msg: "Falta informacion del usuario"})
      return
   }
   let conn;
  
   try {
      conn = await pool.getConnection()

      const user = await conn.query(modelodbaudiovisual.queryfighterexist,[sala])

      if(!user){
         res.status(403).json({msg: `la sala ${sala} ya se encuentra registrado`})
         return
      }

      const salt = bcryptjs.genSaltSync()

      const affectedRows = await conn.query(modelodbaudiovisual.queryaddfighter,[
         cliente,
         sala,
         personal
      
      ] , (error) => {throw new Error(error)})
      

      if (affectedRows === 0) {
         res.status(404).json({msg: `no se pudo agregar la sala ${sala}`})
         return
   }
      res.json({msg: `la sala ${sala} se agrego correctamente :D`})
      return
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
}

const updatefighterZByfighter = async (req = request, res = response) => { const {
      cliente,
      sala,
      personal
   } = req.body
   if(      
      !cliente||
      !sala||
      !personal
   )
   {
      res.status(400).json({msg: "Falta informacion del cliente"})
      return
   }
   let conn;
  
   try {
      conn = await pool.getConnection()

      const user = await conn.query(modelodbaudiovisual.queryGetfighters, [sala])

      if(user){
         res.status(403).json({msg: `la sala ${sala} no se encuentra registrado`})
         return
      }

      const affectedRows = await conn.query(modelodbaudiovisual.queryupdatebyfighter[
         cliente || user.cliente,
            sala || user.sala,
            personal || user.personal
      ]
        
      , (error) => {throw new Error(error)})
      

      if (affectedRows === 0) {
         res.status(404).json({msg: `no se pudo agregar el registro del usuario ${sala}`})
         return
   }
      res.json({msg: `la sala ${sala} se actualizo correctamente :D`})
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
}


module.exports = {getfighters,getfightersByID,deletefightersByID,addfighter,updatefighterZByfighter}