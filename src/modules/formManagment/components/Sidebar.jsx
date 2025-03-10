export const Sidebar = ({ questions, onRenderQuestion, addQuestion }) => {
  return (
    <div className="sidebar open">
      <div className="logo-details">
        <div className="logo_name">Questions</div>
      </div>
      <ul className="nav-list">
        {
          questions.map((question, i) => (
            <li key={question.id} className='add-btn question' onClick={ () => onRenderQuestion(question.id, i) }>
              <p>Question {i + 1}</p>
              {
                question.isActive ? 
                <p className='type'><i className="fas fa-check-circle"></i> {question.type}</p>
                :
                <p className='type'><i className="fas fa-times"></i> {question.type}</p>
              }
            </li>
          ))
        }
        <li className='add-btn add' onClick={addQuestion}>
            <div className="icon-add">
              <i className="fas fa-plus"></i>
            </div>
            <p>Add Question</p>
        </li>
      </ul>
    </div>
  );
};
