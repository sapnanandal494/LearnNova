export const initialSeedData = {
  users: [
    {
      id: "usr_elena_01",
      name: "Elena Vance",
      email: "elena.vance@learnnova.edu",
      password: "password123",
      role: "student",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5O-qBknxwo4PYLNoJ8nze2vQgb2jjqsDgoNQIv2loDyg1yr-GP5SJOggO3BqBB2ud5OnTqpFxC18qEykpx-lUAgEhySRnB3t9dFkL5ASKxJyAWq-HWQJfmm9_ERrhffVGq6hDFyGtbS8SxrTdpWz05qz2xc2EgacPymmJ6JwXoXU7-pXak1Rn9MDG3lD25PpZmLsaQaCugTOnOU50Pvbvc3b5zzElYk2XYQjPJXA",
      degreeTrack: "Dual Degree Track: Artificial Intelligence & Neuroscience",
      term: "Fall 2024 • Term 2",
      academicSession: "Academic Session 2024-2025",
      streakDays: 6,
      weeklyGoalHours: 20,
      loggedHours: 15.6,
      averageScore: 91.5,
      gpa: 3.88,
      attendanceRate: 92.4,
      enrolledCourses: ["CS-402", "CS-501", "MATH-304", "NEUR-410", "ENG-210", "DS-301"]
    },
    {
      id: "usr_teacher_01",
      name: "Dr. James Wilson",
      email: "james.wilson@learnnova.edu",
      password: "password123",
      role: "teacher",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      degreeTrack: "Head of Computational Science",
      term: "Faculty Term 2",
      academicSession: "Academic Session 2024-2025",
      streakDays: 45,
      weeklyGoalHours: 35,
      loggedHours: 32.0,
      averageScore: 98.0,
      gpa: 4.0,
      attendanceRate: 99.0,
      enrolledCourses: ["CS-402", "CS-501"]
    }
  ],

  courses: [
    {
      id: "c_cs402",
      code: "CS-402",
      title: "Deep Learning & Neural Architectures",
      instructor: "Dr. Marcus Vance",
      instructorRole: "Director, Stanford AI Lab Track",
      department: "AI & Data Science",
      level: "Graduate",
      credits: 4.0,
      durationHours: 64,
      rating: 4.95,
      reviewCount: 342,
      enrolledCount: 1420,
      price: 3499,
      isFree: false,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuC775KgGIm-4jOXBf-doBaqAUkF6MLSTachAAPxLCfJ3u_Sz16r3Ru8EdnfOl2qZQ_MBgeqVUJhD4vUUYWpuPXq2lkcuaG4qGZfZQxZzNAI2K9jTk7uXAcJbDkz7CxTzRLgJEemSp7tkpDZgcT9VM07W6LsXijaxEzK8RZS5lIAiqWI8wydyAcbIf_gVHZkXVZj2r3RDy8c0tchlHMGn0hpECTMReRHd6SY9eknRVo",
      tags: ["Deep Learning", "PyTorch", "Transformers", "GPU Acceleration"],
      description: "Rigorous study of modern deep representation learning, from backpropagation dynamics to attention mechanisms and multimodal diffusion foundations.",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: "Backpropagation & Gradient Flow Optimization",
      modules: [
        { title: "Computational Graphs & Autodiff", duration: "6 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Convolutional Networks & Spatial Invariance", duration: "8 hrs", lessonsCount: 6, isCompleted: true },
        { title: "Attention Mechanisms & Transformer Heads", duration: "10 hrs", lessonsCount: 8, isCompleted: true },
        { title: "Diffusion Probabilistic Models & Sampling", duration: "12 hrs", lessonsCount: 6, isCompleted: false }
      ]
    },
    {
      id: "c_cs501",
      code: "CS-501",
      title: "Distributed Systems & Cloud Infrastructure",
      instructor: "Prof. Elena Rostov",
      instructorRole: "Principal Distributed Architect",
      department: "Computer Science",
      level: "Intermediate",
      credits: 4.0,
      durationHours: 48,
      rating: 4.88,
      reviewCount: 215,
      enrolledCount: 980,
      price: 2999,
      isFree: false,
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      tags: ["Distributed Systems", "Raft", "Paxos", "Kubernetes", "gRPC"],
      description: "Principles of fault-tolerant distributed algorithms, vector clocks, consensus protocols (Raft, Paxos), and low-latency cloud architectures.",
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      nextLesson: "Raft Consensus Protocol & Log Replication",
      modules: [
        { title: "Logical Clocks & Event Ordering", duration: "5 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Two-Phase Commit & Distributed Transactions", duration: "7 hrs", lessonsCount: 5, isCompleted: true },
        { title: "Consensus Algorithms: Paxos & Raft", duration: "8 hrs", lessonsCount: 6, isCompleted: false },
        { title: "Byzantine Fault Tolerance & Blockchain Primitives", duration: "6 hrs", lessonsCount: 5, isCompleted: false }
      ]
    },
    {
      id: "c_math304",
      code: "MATH-304",
      title: "Advanced Algorithms & Graph Theory",
      instructor: "Dr. Alexander Klein",
      instructorRole: "Chair of Discrete Mathematics",
      department: "Mathematics",
      level: "Intermediate",
      credits: 3.5,
      durationHours: 42,
      rating: 4.82,
      reviewCount: 198,
      enrolledCount: 1100,
      price: 2499,
      isFree: false,
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
      tags: ["Graph Algorithms", "Max-Flow", "NP-Completeness", "Dynamic Programming"],
      description: "Analysis of high-performance algorithmic paradigms, network flow algorithms, spectral graph theory, and randomized approximation strategies.",
      progress: 82,
      totalLessons: 22,
      completedLessons: 18,
      nextLesson: "Ford-Fulkerson & Push-Relabel Maximum Flow",
      modules: [
        { title: "Divide and Conquer & Master Theorem", duration: "4 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Shortest Paths & Spanning Trees", duration: "6 hrs", lessonsCount: 5, isCompleted: true },
        { title: "Network Flows & Cut Minimization", duration: "8 hrs", lessonsCount: 7, isCompleted: true },
        { title: "Approximation Algorithms & Hardness", duration: "6 hrs", lessonsCount: 6, isCompleted: false }
      ]
    },
    {
      id: "c_neur410",
      code: "NEUR-410",
      title: "Computational Cognitive Science & BMI",
      instructor: "Dr. Priya Sharma",
      instructorRole: "Senior Researcher, NeuroAI Lab",
      department: "AI & Data Science",
      level: "Graduate",
      credits: 4.0,
      durationHours: 50,
      rating: 4.91,
      reviewCount: 154,
      enrolledCount: 640,
      price: 3299,
      isFree: false,
      thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80",
      tags: ["Cognitive Science", "EEG Decoding", "Neural Spikes", "Brain-Machine Interface"],
      description: "Exploring computational models of perception, memory encoding, neural population coding, and live signal decoding for neural prosthesis.",
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      nextLesson: "Spike-Triggered Average & Linear Receptive Fields",
      modules: [
        { title: "Hodgkin-Huxley & Cable Theory", duration: "6 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Neural Population Vector Decoding", duration: "8 hrs", lessonsCount: 5, isCompleted: true },
        { title: "Brain-Computer Interface Signal Acquisition", duration: "8 hrs", lessonsCount: 5, isCompleted: false },
        { title: "Reinforcement Learning in Biological Basal Ganglia", duration: "6 hrs", lessonsCount: 4, isCompleted: false }
      ]
    },
    {
      id: "c_eng210",
      code: "ENG-210",
      title: "Modern Compiler Design & LLVM",
      instructor: "Prof. Vikram Sarabhai",
      instructorRole: "Systems Research Group",
      department: "Engineering",
      level: "Graduate",
      credits: 3.5,
      durationHours: 54,
      rating: 4.87,
      reviewCount: 140,
      enrolledCount: 720,
      price: 2799,
      isFree: false,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      tags: ["Compilers", "LLVM", "Abstract Syntax Trees", "Assembly"],
      description: "End-to-end modern compiler construction using LLVM intermediate representation, register allocation, SSA form, and instruction scheduling.",
      progress: 55,
      totalLessons: 20,
      completedLessons: 11,
      nextLesson: "Static Single Assignment (SSA) Dominance Frontiers",
      modules: [
        { title: "Lexical & Syntactic Analysis", duration: "6 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Semantic Analysis & Type Checking", duration: "6 hrs", lessonsCount: 4, isCompleted: true },
        { title: "LLVM IR Generation & Optimizations", duration: "10 hrs", lessonsCount: 6, isCompleted: false },
        { title: "Register Allocation & Target Code Emit", duration: "8 hrs", lessonsCount: 6, isCompleted: false }
      ]
    },
    {
      id: "c_ds301",
      code: "DS-301",
      title: "Data Science & Statistical Inference",
      instructor: "Dr. Emily Chen",
      instructorRole: "Chair of Applied Statistics",
      department: "AI & Data Science",
      level: "Beginner",
      credits: 3.0,
      durationHours: 40,
      rating: 4.90,
      reviewCount: 987,
      enrolledCount: 8750,
      price: 0,
      isFree: true,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      tags: ["Statistics", "Hypothesis Testing", "Python", "Pandas", "Bayesian"],
      description: "Fundamental statistical estimation, bootstrapping, Markov chain Monte Carlo, and practical exploratory data analysis in Python.",
      progress: 90,
      totalLessons: 16,
      completedLessons: 14,
      nextLesson: "Bayesian Conjugate Priors & MCMC Sampling",
      modules: [
        { title: "Probability Distributions & Central Limit Theorem", duration: "4 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Confidence Intervals & Null Hypothesis Significance", duration: "6 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Linear & Logistic Regression Diagnostics", duration: "8 hrs", lessonsCount: 4, isCompleted: true },
        { title: "Bayesian Parameter Estimation", duration: "6 hrs", lessonsCount: 4, isCompleted: false }
      ]
    }
  ],

  assignments: [
    {
      id: "asg_01",
      title: "Lab 4: Backpropagation & PyTorch Autograd Engine",
      courseCode: "CS-402",
      courseName: "Deep Learning & Neural Architectures",
      dueDate: "Tonight, 11:59 PM",
      dueStatus: "Due Tonight",
      status: "pending",
      type: "lab",
      grade: null,
      score: null,
      maxScore: 100,
      testSuiteStatus: "12/15 Tests Passing",
      gitRepo: "github.com/elena-vance/cs402-autograd-lab",
      instructions: "Implement backward passes for Tensor multiplication, 2D convolution, and Softmax Cross Entropy. Verify computational graph with topological sorting."
    },
    {
      id: "asg_02",
      title: "Lab 7: Distributed Paxos Consensus Node",
      courseCode: "CS-501",
      courseName: "Distributed Systems & Cloud Infrastructure",
      dueDate: "Nov 22, 5:00 PM",
      dueStatus: "In 4 Days",
      status: "pending",
      type: "lab",
      grade: null,
      score: null,
      maxScore: 100,
      testSuiteStatus: "8/8 Tests Passing",
      gitRepo: "github.com/elena-vance/dist-paxos-node",
      instructions: "Simulate a cluster of 5 nodes handling network partitions and leader crashes under concurrent proposals."
    },
    {
      id: "asg_03",
      title: "Problem Set 6: Max-Flow Min-Cut Formulations",
      courseCode: "MATH-304",
      courseName: "Advanced Algorithms & Graph Theory",
      dueDate: "Nov 25, 11:59 PM",
      dueStatus: "In 7 Days",
      status: "pending",
      type: "theory",
      grade: null,
      score: null,
      maxScore: 50,
      testSuiteStatus: "Manual Review Required",
      gitRepo: "github.com/elena-vance/math304-pset6",
      instructions: "Formalize the bipartite matching reduction to Max-Flow and prove time complexity bounds."
    },
    {
      id: "asg_04",
      title: "Capstone: Multi-Agent Neural Architecture Search",
      courseCode: "CS-402",
      courseName: "Deep Learning & Neural Architectures",
      dueDate: "Nov 15, Completed",
      dueStatus: "Graded",
      status: "graded",
      type: "capstone",
      grade: "A+",
      score: 98,
      maxScore: 100,
      testSuiteStatus: "All 20/20 Benchmarks Exceeded",
      gitRepo: "github.com/elena-vance/nas-multiagent-capstone",
      instructions: "Design an evolutionary controller to synthesize sparse CNN backbones under 10M FLOPs constraints."
    },
    {
      id: "asg_05",
      title: "Lab 3: LLVM AST Visitor & Constant Folding Pass",
      courseCode: "ENG-210",
      courseName: "Modern Compiler Design & LLVM",
      dueDate: "Nov 10, Completed",
      dueStatus: "Graded",
      status: "graded",
      type: "lab",
      grade: "A",
      score: 94,
      maxScore: 100,
      testSuiteStatus: "14/14 Unit Tests Passed",
      gitRepo: "github.com/elena-vance/llvm-constant-folder",
      instructions: "Traverse AST nodes and reduce compile-time arithmetic expressions directly into constant primitives."
    }
  ],

  quizzes: [
    {
      id: "quiz_01",
      title: "Neural Network Optimization & Gradient Flow",
      courseCode: "CS-402",
      courseName: "Deep Learning & Neural Architectures",
      category: "Diagnostic Quiz",
      status: "active",
      totalQuestions: 5,
      durationMinutes: 15,
      dueDate: "Tomorrow, 11:59 PM",
      highScore: 100,
      userScore: null,
      xpReward: 150,
      questions: [
        {
          question: "Which mechanism prevents vanishing gradients during backpropagation across very deep architectures?",
          options: [
            "Residual skip connections that allow uninterrupted identity gradient flow",
            "Increasing the number of Sigmoid activation layers",
            "Setting learning rate to 0.9 without decay",
            "Removing normalization layers entirely"
          ],
          correctAnswer: 0,
          explanation: "Residual connections provide a direct highway for gradients to flow backward unchanged (d(x + F(x))/dx = 1 + dF/dx), avoiding vanishing gradients."
        },
        {
          question: "In the Adam optimizer, what role does the second moment estimate (v_t) perform?",
          options: [
            "It computes the moving average of uncentered second moments (squared gradients) to scale learning rates adaptively",
            "It controls momentum direction only",
            "It acts as an L1 lasso regularizer",
            "It calculates weight decay using cross-entropy"
          ],
          correctAnswer: 0,
          explanation: "v_t tracks exponentially decaying averages of past squared gradients, allowing parameter-specific learning rate scaling."
        },
        {
          question: "Why is layer normalization preferred over batch normalization in transformer sequence models?",
          options: [
            "It normalizes across feature dimensions independently of batch size and sequence length",
            "It requires zero floating point computations",
            "It only applies to recurrent states",
            "It eliminates weight matrices in projection layers"
          ],
          correctAnswer: 0,
          explanation: "LayerNorm operates across the hidden dimension of each token independently, making it invariant to batch size variations and variable sequence lengths."
        },
        {
          question: "What is the primary advantage of FlashAttention over vanilla self-attention?",
          options: [
            "It tiles matrices to compute exact attention within high-speed GPU SRAM, minimizing slow HBM memory read/writes",
            "It approximates attention scores with low-rank random projections",
            "It replaces softmax with a step function",
            "It converts floating-point weights to 1-bit integers"
          ],
          correctAnswer: 0,
          explanation: "FlashAttention leverages online softmax tiling to avoid materializing the full N×N attention matrix in slow GPU HBM memory."
        },
        {
          question: "When training with Mixed Precision (FP16/BF16), why is loss scaling necessary?",
          options: [
            "Small gradient values can underflow to zero in FP16 representation",
            "Large weights always overflow in the forward pass",
            "It forces all weights to integer values",
            "It replaces backpropagation with evolutionary heuristics"
          ],
          correctAnswer: 0,
          explanation: "In FP16, very small gradient values underflow to zero. Multiplying the loss by a scaling factor preserves these small gradients through backprop."
        }
      ]
    },
    {
      id: "quiz_02",
      title: "Raft Consensus & Distributed Fault Tolerance",
      courseCode: "CS-501",
      courseName: "Distributed Systems & Cloud Infrastructure",
      category: "Midterm Diagnostic",
      status: "active",
      totalQuestions: 4,
      durationMinutes: 12,
      dueDate: "In 3 Days",
      highScore: 95,
      userScore: null,
      xpReward: 120,
      questions: [
        {
          question: "In Raft consensus, how does a candidate guarantee that a leader won't overwrite committed log entries?",
          options: [
            "A candidate only wins if its log is at least as up-to-date as the majority of voters",
            "Nodes accept the candidate with the highest IP address",
            "Voters randomize their votes unconditionally",
            "Logs are stored in a centralized shared disk"
          ],
          correctAnswer: 0,
          explanation: "Raft's election restriction states that a follower denies its vote if the candidate's last log term is smaller or index is shorter than its own."
        },
        {
          question: "What happens when a network partition creates two distinct sub-clusters in a 5-node cluster?",
          options: [
            "Only the partition with a quorum (3 or more nodes) can commit new log entries",
            "Both sides can independently commit conflicting entries",
            "All nodes self-terminate immediately",
            "The cluster switches automatically to single-node mode"
          ],
          correctAnswer: 0,
          explanation: "A majority quorum (> N/2) is strictly required to commit log entries, guaranteeing that disjoint partitions cannot both commit."
        },
        {
          question: "What is the difference between safety and liveness in distributed systems?",
          options: [
            "Safety ensures nothing bad happens; liveness ensures something good eventually happens",
            "Safety ensures latency is low; liveness ensures bandwidth is high",
            "They are mathematically identical terms",
            "Safety only applies to hardware disks"
          ],
          correctAnswer: 0,
          explanation: "Safety properties state that bad things never occur (e.g. no split-brain), whereas liveness guarantees eventual progress."
        },
        {
          question: "In vector clocks, if VC(A) < VC(B), what can we conclude?",
          options: [
            "Event A causally preceded event B",
            "Events A and B are concurrent",
            "Event B occurred before event A",
            "A clock synchronization failure occurred"
          ],
          correctAnswer: 0,
          explanation: "If every component of VC(A) <= VC(B) and at least one is strictly less, event A causally precedes event B."
        }
      ]
    }
  ],

  lectures: [
    {
      id: "lec_01",
      title: "The Frontier of Embodied Artificial Intelligence & Physical Agents",
      speaker: "Dr. Demis Hassabis",
      speakerTitle: "Turing Laureate & Research Lead",
      speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      category: "Artificial Intelligence",
      date: "Nov 24, 2026",
      time: "10:00 AM EST • Live Stage 1",
      status: "upcoming",
      registeredCount: 3840,
      badge: "Keynote Horizon 2026",
      description: "Exploring physical grounding, multi-modal world models, and spatial intelligence spanning robotics and planetary discovery.",
      playbackUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "lec_02",
      title: "Quantum Supremacy & Fault-Tolerant Topological Qubits",
      speaker: "Prof. Michelle Simmons",
      speakerTitle: "Quantum Physics Pioneer",
      speakerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      category: "Quantum Computing",
      date: "Nov 28, 2026",
      time: "2:00 PM EST • Live Stage 2",
      status: "upcoming",
      registeredCount: 2910,
      badge: "Global Keynote Series",
      description: "Direct atomic-scale fabrication of silicon quantum processors and error mitigation across multi-qubit registers.",
      playbackUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "lec_03",
      title: "Scaling Foundation Models Beyond Transformer Limits",
      speaker: "Dr. Fei-Fei Li",
      speakerTitle: "Co-Director, Stanford AI Institute",
      speakerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      category: "Artificial Intelligence",
      date: "Recorded • Available Now",
      time: "1 hr 45 min",
      status: "recorded",
      registeredCount: 12400,
      badge: "Masterclass Replay",
      description: "Deep dive into state-space models, recurrent depth, neuro-symbolic reasoning, and energy-efficient cognitive architectures.",
      playbackUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],

  studyMaterials: [
    {
      id: "mat_01",
      title: "CS-402: Comprehensive Lecture Notes on Attention & FlashAttention",
      courseCode: "CS-402",
      subject: "AI & Data Science",
      fileType: "PDF",
      fileSize: "4.8 MB",
      author: "Stanford AI Lab Track",
      downloads: 1420,
      isAiGenerated: false,
      badge: "Core Syllabus",
      url: "#"
    },
    {
      id: "mat_02",
      title: "CS-501: Distributed Consensus & Paxos Proof Packet",
      courseCode: "CS-501",
      subject: "Computer Science",
      fileType: "PDF",
      fileSize: "2.6 MB",
      author: "Dept. of Computer Science",
      downloads: 980,
      isAiGenerated: false,
      badge: "Faculty Key",
      url: "#"
    },
    {
      id: "mat_03",
      title: "MATH-304: Spectral Graph Theory & Laplacian Matrices Cheatsheet",
      courseCode: "MATH-304",
      subject: "Mathematics",
      fileType: "PDF",
      fileSize: "1.9 MB",
      author: "Discrete Math Group",
      downloads: 1105,
      isAiGenerated: false,
      badge: "Formula Sheet",
      url: "#"
    },
    {
      id: "mat_04",
      title: "AI Synthesis: Neural Spike Decoding & Vector Reconstruction",
      courseCode: "NEUR-410",
      subject: "Cognitive Science",
      fileType: "Markdown / Notebook",
      fileSize: "1.2 MB",
      author: "LearnNova AI Copilot",
      downloads: 640,
      isAiGenerated: true,
      badge: "AI Study Pack",
      url: "#"
    }
  ],

  timetable: [
    { id: "tt_01", day: "Monday", time: "09:00 - 10:30", courseCode: "CS-402", title: "Deep Learning & Neural Architectures", room: "Hall B / Online", instructor: "Dr. Marcus Vance" },
    { id: "tt_02", day: "Monday", time: "11:00 - 12:30", courseCode: "CS-501", title: "Distributed Systems & Cloud Infrastructure", room: "Lab 304", instructor: "Prof. Elena Rostov" },
    { id: "tt_03", day: "Tuesday", time: "10:00 - 11:30", courseCode: "MATH-304", title: "Advanced Algorithms & Graph Theory", room: "Lecture Hall A", instructor: "Dr. Alexander Klein" },
    { id: "tt_04", day: "Wednesday", time: "14:00 - 16:00", courseCode: "CS-402", title: "Autograd Lab Session & GPU Cluster", room: "GPU Cluster Lab 2", instructor: "Dr. Marcus Vance" },
    { id: "tt_05", day: "Thursday", time: "09:30 - 11:00", courseCode: "NEUR-410", title: "Computational Cognitive Science", room: "Neuro Hall", instructor: "Dr. Priya Sharma" },
    { id: "tt_06", day: "Friday", time: "13:00 - 14:30", courseCode: "ENG-210", title: "Modern Compiler Design & LLVM", room: "Systems Lab 102", instructor: "Prof. Vikram Sarabhai" }
  ]
};
