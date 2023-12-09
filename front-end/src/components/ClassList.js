import React from 'react';
import ClassRoom from './ClassRoom'; // Import component Classroom
import '../App.css';

const ClassList = (props) => {
    const ClassData = props.ClassData;

  return (
    <div className="class-list">
      {ClassData.map((classItem, index) => (
        <ClassRoom
          key={index} // Key should be unique, consider using a unique identifier from your data
          TenLop={classItem.TenLop}
          ChuDe={classItem.ChuDe}
          MaLop={classItem.MaLop}
        />
      ))}
    </div>
  );
};

export default ClassList;