'use client';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve ter mais de 2 caracteres',
  }),
  email: z.string().email({ message: 'Deve ser um email válido' }),
  message: z.string(),
});

export default function ContatoSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      await new Promise((res) => setTimeout(res, 1000));
      if (Math.random() < 0.2) throw new Error('Falha simulada');

      toast.success('Mensagem enviada!', {
        description: 'Entraremos em contato em breve.',
      });

      form.reset();
    } catch {
      toast.error('Erro ao enviar mensagem', {
        description: 'Tente novamente mais tarde.',
      });
    }
  }

  return (
    <section className="w-full bg-gradient-to-b from-black/85 to-black py-12 sm:py-16 md:py-20">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="relative hidden md:block">
            <Image
              src="/mulher-em-um-carro-amarelo.jpg"
              alt="Entre em contato"
              className="rounded-2xl object-cover shadow-lg"
              width={800}
              height={600}
            />
          </div>

          <div className="w-full max-w-lg mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white text-center md:text-left">
              Fale Conosco
            </h1>
            <p className="text-white/80 mb-8 text-center md:text-left">
              Preencha o formulário abaixo e entraremos em contato.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome"
                          className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seuemail@email.com"
                          className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Nos mande uma mensagem..."
                          className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full font-semibold"
                >
                  Enviar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
