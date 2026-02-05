import { Accordion, Content, Tab, Trigger } from './accordion'

export const Faq = () => (
  <div className="flex w-full items-start justify-center">
    <div className="w-full max-w-[850px] flex flex-col items-center">
      <h1 
        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pt-12 pb-8"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        FAQ
      </h1>
      <div className="w-full flex justify-center">
        <Accordion className="w-full">
          {questions.map((e, i) => {
            return (
              <Tab key={i}>
                <Trigger className="text-white">{e.question}</Trigger>
                <Content className="text-white">{e.answer}</Content>
              </Tab>
            )
          })}
        </Accordion>
      </div>
    </div>
  </div>
)

const questions = [
  {
    question: "What's the best manga ever written and why?",
    answer: `Berserk. It's about a warrior born from a dead flesh of a hanged mother, marked by the brand of sacrifice by apostles of the devil themselves. But he never gave a fuck and fought them as if he were immortal, despite the unending enemies and absence of hope for escape. Through his endless struggle, he became a creator of his own destiny and escaped unavoidable death at the Eclipse.`
  },
  { question: 'How to get kawai waifu?', answer: 'stop watching anime, hit the gym, go to japan' },
  {
    question: 'Who is behind this project?',
    answer: 'Dude named Luka Donadze (@lukachodonadze)'
  }
]