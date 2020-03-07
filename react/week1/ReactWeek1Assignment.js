class Student {
  constructor(name, email, community) {
    this.name = name;
    this.email = email;
    this.community = community;
  }
}

class Bootcamp {
  constructor(name, level, students = []) {
    this.name = name;
    this.level = level;
    this.students = students;
  }

  registerStudent(student) {
    if (!this.students.filter(s => s.email === student.email).length) {
      this.students.push(student);
      console.log(`Registering ${student.email} to the ${this.name} course.`);
    } else {
      console.log('That student is already registered to this course!');
    }
    return this.students;
  }
}
