class Student
  attr_reader :id, :age, :name, :github
  
  def initialize(options)
    @id = options["id"]
    @name = options["name"]
    @age = options["age"]
    @github = options["github"]
  end
  
  def can_drink?
    age >= 200
  end
  
  def ultra_wise?
    age >= 1000
  end
  
  def github_link
    "http://github.com/#{github}"
  end
  
  # Public: Get a list of all students from the database.
  #
  # Returns an Array of Student objects.
  def self.all
    results = DATABASE.execute("SELECT * FROM students")
    
  #creates a new array index for each item returned from
  #students
    results.map { |row_hash| self.new(row_hash) }
  end
  
  # Public: Get a single student from the database.
  #
  # s_id - Integer
  #
  # Returns a Student object.
  def self.find(s_id)
    result = DATABASE.execute("SELECT * FROM students WHERE id = #{s_id}")[0]
    
    self.new(result)
  end
  
  
  # Public: Add a single student to the database.
  #
  #
  # Returns a Student object.
  def save
    if self.id == nil
      DATABASE.execute("INSERT INTO students (name,age,github) VALUES ('#{self.name}', #{self.age.to_i}, '#{self.github}')")
    elsif self.name == nil
      DATABASE.execute("DELETE FROM students WHERE id = #{self.id}")
    else
      DATABASE.execute("UPDATE students SET name = '#{self.name}', age = #{self.age.to_i}, github = '#{self.github}' WHERE ID = #{self.id.to_i}") 
    end  
  end
  
  # Returns the object as a Hash.
  def to_hash
    {
      id: id,
      name: name,
      age: age,
      github: github
    }
  end
end