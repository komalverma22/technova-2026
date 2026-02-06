import { Accordion, Content, Tab, Trigger } from './accordion'

export const Faq = () => (
  <div className="flex w-full items-start justify-center">
    <div className="w-full max-w-[850px] flex flex-col items-center">
      <h1 
        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pt-12 pb-12"
        style={{ fontFamily: 'Eagle Lake' }}
      >
        FAQ
      </h1>
      <div className="w-full flex justify-center">
        <Accordion className="w-full">
          {questions.map((e, i) => {
            return (
              <Tab key={i}>
                <Trigger className="text-white">{e.question}</Trigger>
                <Content className="text-white/60">{e.answer}</Content>
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
    question: "What is this tech event about?",
    answer: `A college-organized tech event focused on innovation, learning, and hands-on activities like workshops and competitions.`
  },
  { question: 'Who can participate?', answer: 'All college students can participate, regardless of branch or year.' },
  {
    question: 'Do I need prior technical knowledge?',
    answer: 'No, the event includes sessions for both beginners and advanced learners.'
  },
  { question: 'How can I register?', answer: 'You can register through the official event website using the registration form.' },
  {
    question: 'Is there any registration fee?',
    answer: 'Most events are free; some may have a small fee mentioned in the details.'
  },

  
]