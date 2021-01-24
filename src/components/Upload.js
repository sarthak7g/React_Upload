import React, { Fragment, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [percentageUpload, setUploadPercent] = useState(0);

  const onchange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("filename", file);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/upload-file?contact_name=sarthak&contact_email=sarthak@rklick.com&uuid=12",
        formData,
        options
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    e.target.submit();
  };

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setUploadPercent(percent);
    },
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="file-name"
            onChange={onchange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
          {percentageUpload > 0 && (
            <ProgressBar
              animated
              now={percentageUpload}
              label={`${percentageUpload}%`}
            />
          )}
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </Fragment>
  );
};

export default Upload;
