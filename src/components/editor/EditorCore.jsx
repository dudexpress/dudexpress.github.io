import React, { useState } from "react"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { EditorLsgiochi } from "./fields/EditorLsgiochi"
import { EditorBlasone } from "./fields/EditorBlasone"
import { EditorComplexity } from "./fields/EditorComplexity"
import { EditorComponents } from "./fields/EditorComponents"
import { EditorDate } from "./fields/EditorDate"
import { EditorDescription } from "./fields/EditorDescription"
import { EditorDesigners } from "./fields/EditorDesigners"
import { EditorDownloader } from "./fields/EditorDownloader"
import { EditorDungeondice } from "./fields/EditorDungeondice"
import { EditorFantasia } from "./fields/EditorFantasia"
import { EditorGetYourFun } from "./fields/EditorGetYourFun"
import { EditorImages } from "./fields/EditorImages"
import { EditorLongevity } from "./fields/EditorLongevity"
import { EditorLuck } from "./fields/EditorLuck"
import { EditorMagicMerchant } from "./fields/EditorMagicMerchant"
import { EditorMechanism } from "./fields/EditorMechanism"
import { EditorNecessity } from "./fields/EditorNecessity"
import { EditorPlayerCount } from "./fields/EditorPlayerCount"
import { EditorPlayerCountOfficial } from "./fields/EditorPlayerCountOfficial"
import { EditorPlayingTime } from "./fields/EditorPlayingTime"
import { EditorPlayingTimeOfficial } from "./fields/EditorPlayingTimeOfficial"
import { EditorPortability } from "./fields/EditorPortability"
import { EditorPreparation } from "./fields/EditorPreparation"
import { EditorPublisher } from "./fields/EditorPublisher"
import { EditorScore } from "./fields/EditorScore"
import { EditorState } from "draft-js"
import { EditorTitle } from "./fields/EditorTitle"
import { EditorTypeContent } from "./fields/EditorTypeContent"
import { EditorWYSIWYG } from "./fields/EditorWYSIWYG"
import { EditorWeight } from "./fields/EditorWeight"
import { EditorWriter } from "./fields/EditorWriter"
import Form from "react-bootstrap/Form"
import { Helmet } from "react-helmet"
import Layout from "../Layout"
import Row from "react-bootstrap/Row"

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
    [magicmerchantUrl, setmagicmerchantUrl] = useState(),
    [getYourFunUrl, setGetYourFunUrl] = useState(),
    [blasoneshopUrl, setBlasoneshopUrl] = useState(),
    [lsgiochiUrl, setLsgiochiUrl] = useState(),
    [date, setDate] = useState(),
    [typeContent, setTypeContent] = useState("review"),
    [panoramic, setPanoramic] = useState(EditorState.createEmpty()),
    [necessity, setNecessity] = useState(1)

  if (window == null) {
    return null
  }

  const isEnabled =
    date &&
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
    longevity &&
    components &&
    portability &&
    feedback &&
    files &&
    typeContent === "review"
      ? necessity && panoramic
      : luck && setting && rules

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Nuova contenuto : </h1>

            <Form className="mb-5">
              <EditorTypeContent
                value={typeContent}
                setValue={setTypeContent}
              />
              <EditorDate value={date} setValue={setDate} />

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
              {typeContent === "review" ? (
                <EditorLuck setValue={setLuck} value={luck} />
              ) : (
                <EditorNecessity setValue={setNecessity} value={necessity} />
              )}
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
              <EditorMagicMerchant
                value={magicmerchantUrl}
                setValue={setmagicmerchantUrl}
              />
              <EditorGetYourFun
                value={getYourFunUrl}
                setValue={setGetYourFunUrl}
              />
              <EditorBlasone
                value={blasoneshopUrl}
                setValue={setBlasoneshopUrl}
              />
              <EditorLsgiochi value={lsgiochiUrl} setValue={setLsgiochiUrl} />

              <h2 className="mt-5">Contenuto</h2>

              {typeContent === "review" ? (
                <>
                  {" "}
                  <EditorWYSIWYG
                    name="Ambientazione"
                    value={setting}
                    setValue={setSetting}
                    text="Cerca di far entrare il lettore nel mondo del gioco, non parlare di meccaniche, di longevità o che altro. Questa sezione serve solo per far immaginare al lettore in cosa si imbatterà, non come."
                  />{" "}
                  <EditorWYSIWYG
                    name="Regole in breve"
                    value={rules}
                    setValue={setRules}
                    text="Spiega solamente le regole necessarie, utilizza elenchi puntati, grassetti e che altro. Le sottoregole non ci interessano. Il lettore deve capire come funziona il gioco, non dobbiamo ricopiare il manuale."
                  />
                </>
              ) : (
                <EditorWYSIWYG
                  name="Panoramica"
                  value={panoramic}
                  setValue={setPanoramic}
                  text="cosa rappresenta questa espansione ? di cosa parla? Cosa aggiunge? Cosa modifica? Facci una panoramica in breve"
                />
              )}
              <EditorWYSIWYG
                name="Impressioni"
                value={feedback}
                setValue={setFeedback}
                text="Cosa ti è piaciuto? Cosa non ti è piaciuto? Sii specifico. Comparalo pure ad altre recensioni presenti su dude."
              />
              <EditorImages value={files} setValue={setFiles} />

              <div className="mt-5 text-center">
                <EditorDownloader
                  typeContent={typeContent}
                  isDisabled={!isEnabled}
                  title={title}
                  date={date}
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
                  magicmerchantUrl={magicmerchantUrl}
                  getYourFunUrl={getYourFunUrl}
                  blasoneshopUrl={blasoneshopUrl}
                  lsgiochiUrl={lsgiochiUrl}
                  setting={setting}
                  rules={rules}
                  feedback={feedback}
                  files={files}
                  panoramic={panoramic}
                  necessity={necessity}
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
