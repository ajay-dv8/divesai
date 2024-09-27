'use client'
import { SectionLabel } from '@/components/section-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { useFilterQuestions } from '@/hooks/settings/use-settings' 
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'

type FilterQuestionsProps = {
  id: string
}

const FilterQuestions = ({ id }: FilterQuestionsProps) => {
  const { register, errors, onAddFilterQuestions, isQuestions, loading } = useFilterQuestions(id)

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">

      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Bot Questions</CardTitle>
        <form
          onSubmit={onAddFilterQuestions}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3"> 
            <SectionLabel
              label="Question"
              message="Add a question that you want your chatbot to ask, you can ask questions to get you customers information "
            />

            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="question"
              placeholder="Type your question"
              type="text"
            />
          </div>

          {/* can remove u think its not needed */}
          {/* <div className="flex flex-col gap-3">
            <SectionLabel
              label="Answer to question"
              message="The answer for the question above"
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="answer"
              placeholder="Type your answer"
              type="text"
              lines={4}
            />
          </div> */}

          <Button
            type="submit"
            className="bg-green/80 hover:bg-green/70 hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Create
          </Button>

        </form>
      </CardContent>

      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>

          {isQuestions.length ? (
            isQuestions.map((question) => (
              <p
                key={question.id}
                className="font-bold"
              >
                {question.question}
              </p>
            ))
          ) : (
            <CardDescription>No Questions</CardDescription>
          )}
        </Loader>
      </CardContent>

    </Card>
  )
}

export default FilterQuestions
