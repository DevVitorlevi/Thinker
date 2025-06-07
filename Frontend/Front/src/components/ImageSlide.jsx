import React, { useState, useEffect } from 'react';
import { SliderContainer, Slide, SlideText } from '../styles/Slider';
import img1 from '../assets/templo.jpg';
import img2 from '../assets/Digital.jpg';
import img3 from '../assets/Socrates.jpg';
import img4 from '../assets/JovemEstudante.jpg';
import img5 from '../assets/Ranking.jpg';

const slides = [
    { image: img1, text: 'A base do conhecimento é sólida como um templo: no Thinker, construímos saber com pilares da sabedoria clássica.' },
    { image: img2, text: 'Conectamos mentes com tecnologia: o Thinker transforma o digital em uma ponte para o aprendizado real.' },
    { image: img3, text: 'Inspirados por Sócrates, despertamos a reflexão: no Thinker, questionar é o primeiro passo para evoluir.' },
    { image: img4, text: 'Cada mente jovem carrega um potencial infinito: o Thinker é o guia nessa jornada de descobertas' },
    { image: img5, text: 'Aqui, aprender é subir de nível: o ranking do Thinker transforma esforço em conquista' },
];

export const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <SliderContainer>
            {slides.map((slide, index) => (
                <Slide
                    key={index}
                    style={{
                        opacity: index === currentIndex ? 1 : 0,
                        position: index === currentIndex ? 'relative' : 'absolute',
                        transition: 'opacity 1s ease-in-out',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <img src={slide.image} alt={`slide-${index}`} />
                    <SlideText>{slide.text}</SlideText>
                </Slide>
            ))}
        </SliderContainer>
    );
};
