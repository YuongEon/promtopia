import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req, {params}) =>{
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate("creator")
    if(!prompt) return new Response("Prompt not found", {status: 404})
    return new Response(JSON.stringify(prompt), {status:200})
  } catch (error) {
    return new Response("Failed to fetch prompt",  {status: 500})
  }
}
export const PATCH = async(req, {params}) =>{
  const {prompt, tag} = await req.json()
  try {
    await connectToDB()
    const promptUpdate = await Prompt.findById(params.id).populate("creator")
    if(!promptUpdate) return new Response("Prompt not found", {status: 404})
    promptUpdate.prompt = prompt
    promptUpdate.tag = tag
    await promptUpdate.save()

    return new Response(JSON.stringify(promptUpdate), {status: 200})
  } catch (error) {
    return new Response("Failed to update prompt",  {status: 500})
  }
}
export const DELETE = async(req, {params}) =>{
  try {
    await connectToDB()
    await Prompt.findByIdAndRemove(params.id).populate("creator")    
    return new Response("Delete success", {status: 200})
  } catch (error) {
    return new Response("Failed to delete prompt",  {status: 500})
  }
}