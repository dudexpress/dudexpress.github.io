import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import { Helmet } from "react-helmet"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { EditorState } from "draft-js"

import Layout from "../Layout"
import { EditorTitle } from "./fields/EditorTitle"
import { EditorDescription } from "./fields/EditorDescription"
import { EditorWriter } from "./fields/EditorWriter"
import { EditorScore } from "./fields/EditorScore"
import { EditorWYSIWYG } from "./fields/EditorWYSIWYG"
import { EditorDesigners } from "./fields/EditorDesigners"
import { EditorPlayingTime } from "./fields/EditorPlayingTime"
import { EditorPlayingTimeOfficial } from "./fields/EditorPlayingTimeOfficial"
import { EditorMechanism } from "./fields/EditorMechanism"
import { EditorPublisher } from "./fields/EditorPublisher"
import { EditorImages } from "./fields/EditorImages"
import { EditorDownloader } from "./fields/EditorDownloader"
import { EditorWeight } from "./fields/EditorWeight"
import { EditorPlayerCount } from "./fields/EditorPlayerCount"
import { EditorPlayerCountOfficial } from "./fields/EditorPlayerCountOfficial"
import { EditorComplexity } from "./fields/EditorComplexity"
import { EditorPreparation } from "./fields/EditorPreparation"
import { EditorLuck } from "./fields/EditorLuck"
import { EditorLongevity } from "./fields/EditorLongevity"
import { EditorComponents } from "./fields/EditorComponents"
import { EditorPortability } from "./fields/EditorPortability"
import { EditorFantasia } from "./fields/EditorFantasia"
import { EditorDungeondice } from "./fields/EditorDungeondice"
import { EditorGetYourFun } from "./fields/EditorGetYourFun"

const EditorCore = ({ data, location, pageContext }) => {
  const siteMeta = data.site.siteMetadata,
    metaTitle = `Nuova recensione | ${siteMeta.title}`,
    [title, setTitle] = useState(""),
    [writer, setWriter] = useState(null),
    [mechanisms, setMechanisms] = useState([]),
    [designers, setDesigners] = useState([]),
    [publishers, setPublishers] = useState([]),
    [description, setDescription] = useState(""),
    [score, setScore] = useState(1),
    [playingTime, setPlayingTime] = useState(""),
    [playingTimeOfficial, setPlayingTimeOfficial] = useState(""),
    [weight, setWeight] = useState(1),
    [playerCount, setPlayerCount] = useState(),
    [playerCountOfficial, setPlayerCountOfficial] = useState(""),
    [complexity, setComplexity] = useState(1),
    [preparation, setPreparation] = useState(1),
    [luck, setLuck] = useState(1),
    [longevity, setLongevity] = useState(1),
    [components, setComponents] = useState(1),
    [portability, setPortability] = useState(1),
    [setting, setSetting] = useState(EditorState.createEmpty()),
    [rules, setRules] = useState(EditorState.createEmpty()),
    [feedback, setFeedback] = useState(EditorState.createEmpty()),
    [files, setFiles] = useState([]),
    [fantasiaUrl, setFantasiaUrl] = useState(),
    [dungeondiceUrl, setDungeondiceUrl] = useState(),
    [getYourFunUrl, setGetYourFunUrl] = useState()

  if (window == null) {
    return null
  }

  const isEnabled =
    title &&
    writer &&
    mechanisms &&
    designers &&
    publishers &&
    description &&
    score &&
    playingTime &&
    playingTimeOfficial &&
    weight &&
    playerCount &&
    playerCountOfficial &&
    complexity &&
    preparation &&
    luck &&
    longevity &&
    components &&
    portability &&
    setting &&
    rules &&
    feedback &&
    files

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Nuova recensione</h1>

            <Form className="mb-5">
              <EditorWriter
                value={writer}
                setValue={setWriter}
                allowedValues={siteMeta.authors}
              />

              <h2 className="mt-5">Header</h2>

              <EditorTitle value={title} setValue={setTitle} />
              <EditorDesigners value={designers} setValue={setDesigners} />
              <EditorPublisher value={publishers} setValue={setPublishers} />
              <EditorDescription
                value={description}
                setValue={setDescription}
              />

              <h2 className="mt-5">Box</h2>
              <EditorScore value={score} setValue={setScore} />
              <EditorPlayingTime
                value={playingTime}
                setValue={setPlayingTime}
              />
              <EditorPlayingTimeOfficial
                value={playingTimeOfficial}
                setValue={setPlayingTimeOfficial}
              />
              <EditorWeight value={weight} setValue={setWeight} />
              <EditorPlayerCount
                value={playerCount}
                setValue={setPlayerCount}
              />
              <EditorPlayerCountOfficial
                value={playerCountOfficial}
                setValue={setPlayerCountOfficial}
              />

              <h2 className="mt-5">Sidebar</h2>

              <EditorMechanism
                value={mechanisms}
                setValue={setMechanisms}
                allowedValues={pageContext.mechanisms}
              />

              <EditorComplexity setValue={setComplexity} value={complexity} />

              <EditorPreparation
                setValue={setPreparation}
                value={preparation}
              />
              <EditorLuck setValue={setLuck} value={luck} />
              <EditorLongevity setValue={setLongevity} value={longevity} />
              <EditorComponents setValue={setComponents} value={components} />
              <EditorPortability
                setValue={setPortability}
                value={portability}
              />

              <h2 className="mt-5">Dove comprare</h2>

              <EditorFantasia value={fantasiaUrl} setValue={setFantasiaUrl} />
              <EditorDungeondice
                value={dungeondiceUrl}
                setValue={setDungeondiceUrl}
              />
              <EditorGetYourFun
                value={getYourFunUrl}
                setValue={setGetYourFunUrl}
              />

              <h2 className="mt-5">Contenuto</h2>

              <EditorWYSIWYG
                name="Ambientazione"
                value={setting}
                setValue={setSetting}
                text="Cerca di far entrare il lettore nel mondo del gioco, non parlare di meccaniche, di longevità o che altro. Questa sezione serve solo per far immaginare al lettore in cosa si imbatterà, non come."
              />
              <EditorWYSIWYG
                name="Regole in breve"
                value={rules}
                setValue={setRules}
                text="Spiega solamente le regole necessarie, utilizza elenchi puntati, grassetti e che altro. Le sottoregole non ci interessano. Il lettore deve capire come funziona il gioco, non dobbiamo ricopiare il manuale."
              />
              <EditorWYSIWYG
                name="Impressioni"
                value={feedback}
                setValue={setFeedback}
                text="Cosa ti è piaciuto? Cosa non ti è piaciuto? Sii specifico. Comparalo pure ad altre recensioni presenti su dude."
              />
              <EditorImages value={files} setValue={setFiles} />

              <div className="mt-5 text-center">
                <EditorDownloader
                  isDisabled={!isEnabled}
                  title={title}
                  writer={writer}
                  mechanisms={mechanisms}
                  publishers={publishers}
                  designers={designers}
                  description={description}
                  playingTime={playingTime}
                  playingTimeOfficial={playingTimeOfficial}
                  score={score}
                  weight={weight}
                  playerCount={playerCount}
                  playerCountOfficial={playerCountOfficial}
                  complexity={complexity}
                  preparation={preparation}
                  luck={luck}
                  longevity={longevity}
                  components={components}
                  portability={portability}
                  fantasiaUrl={fantasiaUrl}
                  dungeondiceUrl={dungeondiceUrl}
                  getYourFunUrl={getYourFunUrl}
                  setting={setting}
                  rules={rules}
                  feedback={feedback}
                  files={files}
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default EditorCore
