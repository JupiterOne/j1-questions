import React, {useMemo} from 'react'
import {
  Typography,
  Card,
  Icon,
  Box,
  Divider,
  Zoom,
} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import {useHistory} from 'react-router-dom'
import filterQuestions, {FilterType} from '../methods/filterQuestions'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useWindowSize } from "@reach/window-size";
import TrackVisibility from "react-on-screen"

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrations: string[];
  tags: string[];
  center?: boolean | undefined;
  search: string;
  filter: string;
  allCategories: string[];
  categories: string[];
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()
  const history = useHistory()
  const windowSize = useWindowSize()

  const filteredQuestions : Question[] = useMemo(() => filterQuestions(
    props.managedQuestions.questions,
    props.integrations,
    props.tags,
    props.search,
    (props.filter === 'any') ? FilterType.ANY : FilterType.ALL,
    props.categories
  ), [props])

  return (
    <Card elevation={0} className={windowSize.width > 750 ? classes.root : classes.smallRoot} style={{margin: props.center ? 'auto' : ''}}>
      <Box style={{textAlign: 'right'}} mr={1} mb={-3}>
        <em>{filteredQuestions.length} of {props.managedQuestions.questions.length}</em>
      </Box>
      {filteredQuestions.length !== 0 ?
        (
          <div>
            {[...props.allCategories, undefined].map(category =>
              <TrackVisibility partialVisibility offset={500} key={category}>
                {visible =>
                  <div>
                    {filteredQuestions.filter(question =>
                      question.category === category
                    ).length !== 0 ?
                      <Box m={1} mt={2}>
                        <Typography variant='h6'>{category === undefined ? 'No Category' : category}</Typography>
                      </Box>
                    : (
                      null
                    )}

                    {filteredQuestions.filter(question =>
                      question.category === category
                    ).map((question: Question, index: number) => (
                      <div>
                        {!visible.isVisible ?
                          <Box mb={1}><Skeleton variant="rect" width={'100%'} height={20} /></Box>
                          :
                          <Zoom in={visible.isVisible}>
                            <div>
                              <Box key={index} onClick={() => history.push(`/question/${question.hash}`)} style={{display: 'flex'}}>
                                <span className={classes.item}>
                                  {question.title}
                                  <div>
                                    {/* question.tags ? question.tags.map(tag => <Chip className={classes.chip} label={tag}/>) : null */}
                                  </div>
                                </span>
                                <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                              </Box>
                              {index !== filteredQuestions.filter(question =>
                                question.category === category
                              ).length - 1 ? <Divider/> : <span/>}
                            </div>
                          </Zoom>
                        }
                      </div>
                    ))}
                  </div>
                }
              </TrackVisibility>
            )}
          </div>
        ) : (
          <Box m={1}><strong>No results.</strong></Box>
        )
      }
    </Card>
  )
}

export default React.memo(QuestionsDisplay);
