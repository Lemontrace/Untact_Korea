function Content() {
  return (
    <main className={"content"}>
      <div className="maps">
        <div className="full-map">

        </div>
        <div className="local-map">

        </div>
      </div>

      <div className="plane-animation">
        <img className={"plane"} src="./plane.svg" alt="plane"/>
        <img className={"flying-route"} src="./flying-route.svg" alt="flying line"/>
      </div>
    </main>
  )
}

export default Content;