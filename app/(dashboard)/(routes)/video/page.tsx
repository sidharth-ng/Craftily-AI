"use client";
import * as z from "zod"
import Heading from '@/components/heading'
import { MessageSquare, Music, Video } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from "./cnstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Empty from "@/components/empty";
import Loading from "@/components/ui/Loading";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { useProModal } from "@/hooks/use-pro-modal";








const VideoPage = () => {
  const router=useRouter()
  const proModal=useProModal()
  const [video, setVideo] = useState<string>();

    const form=useForm<z.infer<typeof formSchema>>({
      resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading=form.formState.isSubmitting;

    const onSubmit=async (values:z.infer<typeof formSchema>)=>{
     try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values)
      setVideo(response.data[0]);
      
      
      form.reset();
      
     } catch (error:any) {
      if(error?.response?.status === 403){
        proModal.onOpen();
    }
      
     }finally{
      router.refresh()

     }
    };


  return (
    <div>
        <Heading
           title="Video Generation"
           description="Turn your text into Video "
           icon={Video}
           iconColor="text-orange-700"
           bgColor="bg-orange-500/10"
        />
        <div className='px-4 lg:px-8'>
          <div>
            <Form {...form}>
              <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg  border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
              >
                <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                    <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Ganaga through himalaya...." 
                        {...field}
                      />  
                    </FormControl>
                  </FormItem>
                )}
              />
               <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
              </form>
            </Form>
          </div>
         <div className="space-y-4 mt-4">
          {isLoading&&(
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loading/>

            </div>
          )}
          {!video && !isLoading && (
          <Empty label="No video generated." />
        )}
          {video &&(
           <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
           <source src={video} />
         </video>
          )}

         </div>

        </div>
    </div>

  )
}

export default VideoPage