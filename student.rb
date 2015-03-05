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
  
  def self.delete(s_id)
    result = DATABASE.execute("DELETE FROM students WHERE id = #{s_id}")[0]
    
    self.new(result)
  end
  
  def self.save(options)
    add_row = DATABASE.execute("INSERT INTO students (name, github, age) 
    VALUES ('#{options:[name]}', '#{options[github]}', '#{options[age]}')") 
    
    self.new(add_row)
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