const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchTeacherById(id) {
  const res = await fetch(`${BASE_URL}/teachers/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch teacher");
  return res.json();
}

export async function fetchStudents(searchTerm = "", page = 1, returnRaw = false, sort = "") {
  let url = `${BASE_URL}/students/?page=${page}`;
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }
  if (sort) {
    url += `&ordering=${encodeURIComponent(sort)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch students");
  const data = await res.json();
  // If paginated, return full object if returnRaw, else just results
  if (returnRaw) return data;
  return Array.isArray(data.results) ? data.results : (Array.isArray(data) ? data : []);
}

export async function addStudent(student) {
  const res = await fetch(`${BASE_URL}/students/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error("Failed to add student");
  return res.json();
}

export async function fetchPlans() {
  const res = await fetch(`${BASE_URL}/plans/`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  const data = await res.json();
  // If paginated, return data.results, else data
  return Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];
}
