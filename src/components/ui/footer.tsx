'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-around py-8 px-4">
        {/* Lado esquerdo: Logo + slogan */}
        <div className="flex flex-col items-center md:items-start justify-center gap-2">
          <div className="w-[200px] md:w-[200px] h-[50px] md:h-[50px] overflow-hidden relative">
            <Image
              src="/LogoGGbranco_amarelo.png"
              alt="Grupo Guerra"
              fill
              className="object-cover object-center"
            />
          </div>
          <p className="text-sm md:text-base text-white/80 max-w-md mb-4 md:mb-0">
            Conquiste seu veículo dos sonhos com a gente! Simule o financiamento
            e venha garantir seu autommóvel!
          </p>
        </div>

        {/* Lado direito: Links sociais */}
        <div className="flex gap-4">
          <Link
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            {/* <Camera className="w-6 h-6 hover:text-yellow-400 transition-colors" /> */}
            <FontAwesomeIcon
              icon={faInstagram}
              className="w-6 h-6 hover:text-yellow-400 transition-colors"
            />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            {/* <Twitter className="w-6 h-6 hover:text-blue-400 transition-colors" /> */}
            <FontAwesomeIcon
              icon={faXTwitter}
              className="w-6 h-6 hover:text-yellow-400 transition-colors"
            />
          </Link>

          <Link
            href="https://facebook.com"
            target="_blank"
            aria-label="Twitter"
          >
            {/* <Twitter className="w-6 h-6 hover:text-blue-400 transition-colors" /> */}
            <FontAwesomeIcon
              icon={faFacebook}
              className="w-6 h-6 hover:text-yellow-400 transition-colors"
            />
          </Link>
          <Link href="https://example.com" target="_blank" aria-label="Website">
            <Globe className="w-6 h-6 hover:text-yellow-400 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Créditos */}
      <div className="border-t border-gray-800 text-center text-xs text-white/50 py-4">
        © {new Date().getFullYear()} Grupo Guerra. Todos os direitos reservados.
      </div>
    </footer>
  );
}
