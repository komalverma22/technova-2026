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
    question: "What is this technova about?",
    answer: `A college-organized tech event focused on innovation, learning, and hands-on activities like workshops and competitions.`
  },
  { question: 'Who can participate?', answer: 'All engineering and science students can participate, regardless of branch or year.' },
  {
    question: 'Do I need prior technical knowledge?',
    answer: 'I is events specific. Refer rule book for more'
  },
  { question: 'How can I register?', answer: 'You can register through the official event website using the registration form.' },
  {
    question: 'Is there any registration fee?',
    answer: 'There is no fees for dcrust students. For external participants one time registration fees is 100 rupees per participant which is payable at the time of physical reporting during the event.'
  },

  { question: 'Is on the spot registration allowed?', answer: 'You can register through the official event website using the registration form.' },
  {
    question: 'Is there any registration fee?',
    answer: 'No, the interested participants must registered online via the official website of technova 2026.'
  },

  
]