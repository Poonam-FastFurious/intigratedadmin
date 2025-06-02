import Toppages from "../../Components/Utils/Toppages";
import { Editor } from "primereact/editor";
import { useState } from "react";
import useGenarlStore from "../../Store/Genaralsetting";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const navigate = useNavigate();

  const { addBlog } = useGenarlStore();
  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [link, setLink] = useState("");

  // Add new section dynamically
  const addSection = (type) => {
    setSections([...sections, { type, content: type === "list" ? [""] : "" }]);
  };

  // Handle content change in sections
  const updateSection = (index, content) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };
  // Handle list item update
  const updateListItem = (index, itemIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[index].content[itemIndex] = value;
    setSections(updatedSections);
  };
  const addListItem = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].content.push("");
    setSections(updatedSections);
  };

  // Handle image selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageSections = files.map((file) => ({
      type: "image",
      content: URL.createObjectURL(file), // Preview
    }));

    setImages([...images, ...files]);
    setSections([...sections, ...newImageSections]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBlog(sections, images, {
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords.split(",").map((tag) => tag.trim()),
      link,
    });
    navigate("/Blog-list");
  };
  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <Toppages title={"Add Blog"} hidden={true} />
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-md">
          <div className="mb-4 flex gap-4">
            <button
              type="button"
              className="btn"
              onClick={() => addSection("title")}
            >
              + Add Title
            </button>
            <button
              type="button"
              className="btn ml-2"
              onClick={() => addSection("paragraph")}
            >
              + Add Paragraph
            </button>
            <button
              type="button"
              className="btn ml-2"
              onClick={() => addSection("list")}
            >
              + Add List
            </button>
            <button>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="input"
              />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Meta Title</label>
              <input
                type="text"
                className="input w-full p-2 border rounded"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Meta Description
              </label>
              <textarea
                className="input w-full p-2 border rounded"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Meta Keywords (comma-separated)
              </label>
              <input
                type="text"
                className="input w-full p-2 border rounded"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Url</label>
              <input
                className="input w-full p-2 border rounded"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-5">
              {section.type === "title" && (
                <input
                  type="text"
                  placeholder="Title"
                  className="input w-full p-2 border rounded"
                  value={section.content}
                  onChange={(e) => updateSection(index, e.target.value)}
                />
              )}
              {section.type === "paragraph" && (
                <Editor
                  value={section.content}
                  onTextChange={(e) => updateSection(index, e.htmlValue)}
                  style={{ height: "200px" }}
                />
              )}
              {section.type === "list" && (
                <div>
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        placeholder={`List item ${itemIndex + 1}`}
                        className="input w-full p-2 border rounded"
                        value={item}
                        onChange={(e) =>
                          updateListItem(index, itemIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn mt-2"
                    onClick={() => addListItem(index)}
                  >
                    + Add List Item
                  </button>
                </div>
              )}
              {section.type === "image" && (
                <img
                  src={section.content}
                  alt="Preview"
                  className="w-40 h-40 object-cover"
                />
              )}
              <button
                type="button"
                className="ml-2 flex w-full justify-end text-red-400 "
                onClick={() => removeSection(index)}
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <button type="submit" className="tp-btn px-10 py-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
