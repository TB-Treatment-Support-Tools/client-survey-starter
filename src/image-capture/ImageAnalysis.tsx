import { Button } from "@mui/material";
import { useEffect, useRef } from "react"
import { analyzeImage, contrastImage } from "../utility/analyze-image";

interface Props {
    imageSrc: string
}

export default function ImageAnalysis({ imageSrc }: Props) {

    const ref = useRef<HTMLCanvasElement>(null);
    const graphRef = useRef<HTMLCanvasElement>(null);

    const handleLoaded = () => {
        const ctx = ref.current?.getContext("2d");
        const i = new Image();
        i.src = imageSrc //"/img/test-input.png"
        i.onload = function () {
            if (ref && ref.current && ctx && graphRef && graphRef.current) {
                ref.current.height = i.height;
                ref.current.width = i.width;
                graphRef.current.height = i.height;
                graphRef.current.width = i.width;
                ctx.drawImage(i, 0, 0);
                const oldData = ctx.getImageData(0, 0, ref.current.width, ref.current.height);
                const newData = contrastImage(oldData, 10);
                ctx.putImageData(newData, 0, 0)
            }
            handleAnalyze();
        }
    }

    const handleAnalyze = () => {
        const values = analyzeImage(ref);
        let ctx = graphRef.current?.getContext("2d");

        let width = graphRef.current?.width;

        if (values && values.length > 0 && ctx) {
            ctx.beginPath();
            ctx.moveTo(Math.floor(values[0] * (width || 0)), 0);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "green";

            let y = 1;
            for (let value of values.reverse()) {
                const x = Math.floor(value * (width || 0));
                ctx.lineTo(x, y);
                y++;
            }
            ctx.stroke();
            ctx.closePath();
        }
    }

    useEffect(() => {
        handleLoaded();
    }, [])

    return (<div>
        <canvas style={{ width: "150px" }} ref={ref}></canvas>
        <canvas style={{ width: "150px" }} ref={graphRef}></canvas>
    </div>)
}